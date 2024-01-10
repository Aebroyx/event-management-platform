import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import {hashMatch, hashPassword} from '@/lib/hashPassword'
import { generateReferralCode } from '@/lib/generateReferralCode';

export class UserController {
    async postRegister(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, firstname, lastname, password, role } = req.body;

            if (!email || !password || !username || !firstname || !lastname) {
                return next({message: "Please insert email, username, and password"})
            }

            const hashedPassword: string = await hashPassword(password);

            // Generate random referral code function

            const referral_generate = generateReferralCode(8)

            const createUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    firstname,
                    lastname,
                    password: hashedPassword,
                    role,
                    referral_num: referral_generate
                }
            })

            res.status(200).send({
                error: false,
                message: "Register Success",
                data: null
            })
        } catch (error: any) {
            if (error.code === "P2002") {
                return next({message: "Email already exist"})
            }
            next({message: "Register Failed"})
        }
    }
}