import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import {hashMatch, hashPassword} from '@/lib/hashPassword'
import { generateReferralCode } from '@/lib/generateReferralCode';
import { jwtCreate, jwtVerify } from '@/lib/jwt';

export class UserController {
    async postRegister(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, firstname, lastname, password, role, referral } = req.body;

            if (!email || !password || !username || !firstname || !lastname || !role) {
                return res.status(400).json({ message: "Please provide all required fields." });
            }

            const hashedPassword: string = await hashPassword(password);
            const newReferralCode: string = generateReferralCode(8); // Generate a new referral code for the user

            const newUser = await prisma.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        username,
                        email,
                        firstname,
                        lastname,
                        password: hashedPassword,
                        role,
                        referral_num: newReferralCode,
                    }
                });

                const INITIAL_USER_POINTS = 0;
                const POINTS_FOR_REFERRAL = 10000; 

                if (referral) {
                    // If a referral code was provided, find the user who owns it and update their points
                    const referrer = await prisma.user.findUnique({
                        where: { referral_num: referral },
                    });

                    if (referrer) {
                        await prisma.point.updateMany({
                            where: { userId: referrer.id },
                            data: { balance: { increment: POINTS_FOR_REFERRAL } }, // Increment points by a defined amount
                        });
                    }
                }

                // Create a points entry for the new user with default 0 points
                await prisma.point.create({
                    data: {
                        userId: user.id,
                        balance: INITIAL_USER_POINTS, // Assuming new users start with some initial points
                        earnedDate: new Date(),
                        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Assuming points expire after 1 year
                    }
                });

                return user;
            });

            res.status(201).json({
                error: false,
                message: "Registration successful.",
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    role: newUser.role,
                    // Don't return password or referral_num
                },
            });
        } catch (error: any) {
            if (error.code === "P2002") {
                return res.status(400).json({ message: "Email or username already exists." });
            }
            console.error("Registration error:", error);
            return res.status(500).json(error.message);
        }
    }


    async postLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const {usernameOrEmail, password} = req.body

            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            username: usernameOrEmail
                        },
                        {
                            email: usernameOrEmail
                        }
                    ]
                }
            })

            if (!user) {
                return next({message: "User not found"})
            }

            const isCompare = await hashMatch(password, user.password)

            if(isCompare === false) {
                return next({message: "Incorrect password"})
            }

            const token = await jwtCreate({id: user.id, role: user.role})

            if (isCompare === true) {
                res.status(200).send({
                    error: false,
                    message: "Login Success",
                    data: {
                        username: user.username,
                        token
                    }
                })
            }
        } catch (error) {
            next({message: "Login Failed"})
        }
    }

    async postKeepLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const verifiedId: any = req.headers.authorization

            if (!verifiedId) {
                return next({message: "Keep Login Failed"})
            }

            const user = await prisma.user.findUnique({
                where: { id: String(verifiedId) }
            })

            res.status(200).json({
                error: false,
                message: "Keep Login Success",
                data: user.username
            })
        } catch (error) {
            next({message: "Keep Login Failed"})
        }
    }
}