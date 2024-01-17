import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import fs from 'fs';
import { CustomRequest } from '@/middleware/tokenVerification';

export class EventController {
    async postCreateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const verifiedId: any = req.headers.authorization;
            console.log('hello')
            console.log(verifiedId)
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

            console.log(newEvent)

            // Create eventCategory Table
            for (const category of categories) {   
                await tx.eventCategory.create({
                    data: {
                        eventId: newEvent.id,
                        categoryId: category
                    }
                })
            }

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

    async getAllEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const allEvent = await prisma.event.findMany({
                include: {
                    eventCategories: true,
                    eventImages: true
                }
            })

            res.status(200).send({
                error: false,
                message: "Get All Event Success",
                data: allEvent
            })
        } catch {
            next({message: "Get All Event Failed"})
        }
    }
}