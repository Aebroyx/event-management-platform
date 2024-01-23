import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import fs from 'fs';
import { CustomRequest } from '@/middleware/tokenVerification';
import { generatePromotionCode } from '@/lib/generatePromotionCode';

export class EventController {

    // Create Event
    async postCreateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const verifiedId: any = req.headers.authorization;
            const { name, description, location, startDate, endDate, price, stock, isFree, categories } = JSON.parse(req.body.data);

            await prisma.$transaction(async (tx) => {

            // Create Event Table
            const newEvent = await tx.event.create({
                data: {
                  organizerId: verifiedId,
                  name,
                  description,
                  location,
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  price,
                  stock,
                  isFree
                }
            })

            // Create eventCategory Table
            const createEventCategory: any = []
            categories.forEach((category: any) => {
                createEventCategory.push({
                    eventId: newEvent.id,
                    categoryId: category
                })
            })

            console.log(createEventCategory)
            
            await tx.eventCategory.createMany({
                data: createEventCategory
            })

            // Insert event Image(s)
            const createImages: any = []
            if (req.files) {
                const filesArray = Array.isArray(req.files) ? req.files : req.files['uploadImg'];

                filesArray.forEach((item: any) => {
                    createImages.push({
                        url: item.filename,
                        eventId: newEvent.id
                    })
                })
    
                await tx.eventImages.createMany({
                    data: createImages
                })
            }
        })

        res.status(201).send({
            error: false,
            message: "Create Event Success",
            data: null
        })
        } catch (error) {
            //console.log(error)
            next({message: "Create Product Failed"}) 
        }
    }

    // Get All Event
    async getAllEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const allEvent = await prisma.event.findMany({
                include: {
                    eventCategories: {include: {category: true}},
                    eventImages: true
                }
            })

            res.status(201).send({
                error: false,
                message: "Get All Event Success",
                data: allEvent
            })
        } catch {
            next({message: "Get All Event Failed"})
        }
    }

    // Get Event by ID
    async getEventById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const event = await prisma.event.findUnique({
                where: { id: Number(id) },
                include: {
                    eventCategories: true,
                    eventImages: true
                }
            });

            res.status(201).send({
                error: false,
                message: "Get Event Success",
                data: event
            })
        } catch (error) {
            next({message: "Get Event Failed"})
        }
    }

    // Create Promotion
    async postEventPromotion(req: Request, res: Response, next: NextFunction) {
        try {
            const { eventId, discountValue, expirationDate, limit } = req.body;

            // Validate input data
            if (!eventId || discountValue === undefined || !expirationDate || limit === undefined) {
                return res.status(400).json({
                    message: "Missing required promotion details"
                });
            }

            // Generate a unique promotion code
            const code = generatePromotionCode(10);

            // Create the promotion record
            const promotion = await prisma.promotion.create({
                data: {
                    eventId,
                    code,
                    discountValue,
                    expirationDate: new Date(expirationDate), // Ensure this is a valid date
                    limit,
                }
            });

            // Respond with success and the created promotion
            res.status(201).send({
                message: "Promotion created successfully",
                data: promotion
            });
        } catch (error) {
            next({message: "Create Promotion Failed"})
        }
    }

    // Create Review
    async postEventReview(req: Request, res: Response, next: NextFunction) {
        try {
            const verifiedId: any = req.headers.authorization;
            const { eventId, comment, rating } = req.body;

            // Validate input data
            if (!eventId || !comment || rating === undefined) {
                return res.status(400).send({
                    message: "Missing required review details"
                });
            }

            // Create the review record
            const review = await prisma.review.create({
                data: {
                    userId: verifiedId,
                    eventId,
                    comment,
                    rating
                }
            });

            res.status(201).send({
                message: "Review created successfully",
                data: review
            });
        } catch (error) {
            next({message: "Create Review Failed"})
        }
    }
}