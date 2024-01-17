import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";

export class TicketController {
    async postTicket(req: Request, res: Response, next: NextFunction) {
        try {
            const verifiedId = req.headers.authorization
            const { eventId, promotionCode, quantity, usePoints} = req.body

            // Validate input data
            if (!eventId || !promotionCode) {
                return res.status(400).json({
                    message: "Missing required ticket details"
                });
            }

            // Get Event Data
            const event = await prisma.event.findUnique({
                where: {
                    id: Number(eventId)
                }, include:{
                    eventCategories: true,
                    eventImages: true,
                    promotions: true
                }
            })

            // Get User Data
            const user = await prisma.user.findUnique({
                where: {
                    id: String(verifiedId)
                }, include:{
                    point: true
                }
            })

            // Ticket variable
            let ticket: any = null

            // Transaction variable
            let transaction: any = null

            // Testing Data
            console.log(verifiedId)
            console.log(event)
            console.log(user)

            // Create the ticket record
            await prisma.$transaction(async (tx) => {
                // If tickets is free
                if (event?.isFree == true) {
                    transaction = await tx.transaction.create({
                        data: {
                            userId: String(verifiedId),
                            amount: 0
                        }
                    })
                    for (let i = 0; i < quantity; i++) {
                        ticket = await tx.ticket.create({
                            data: {
                                userId: String(verifiedId),
                                eventId: Number(eventId),
                                promotionId: null,
                                price: 0,
                                transactionId: transaction.id
                            }
                        })  
                    }
                    await tx.event.update({
                        where: {
                            id: Number(eventId)
                        },
                        data: {
                            stock: {
                                decrement: quantity
                            }
                        }
                    })
                    res.status(201).send({
                        error: false,
                        message: "Transaction Success",
                        data: transaction
                    })
                }

                // If user use points
                if (usePoints == true) {
                    // if user use promotion code
                    if (promotionCode == event?.promotions[0]?.code) {
                        let newPrice = (event?.price * event?.promotions[0]?.discountValue/100) - user.point[0].balance
                        let balanceRemainder = user.point[0].balance - event?.price
                        if (balanceRemainder < 0) {
                            balanceRemainder = 0
                        }

                        transaction = await tx.transaction.create({
                            data: {
                                userId: String(verifiedId),
                                amount: newPrice * quantity
                            }
                        })
                        for (let i = 0; i < quantity; i++) {
                            ticket = await tx.ticket.create({
                                data: {
                                    userId: String(verifiedId),
                                    eventId: Number(eventId),
                                    promotionId: Number(event?.promotions[0]?.id),
                                    price: newPrice,
                                    transactionId: transaction.id
                                }
                            })  
                        }
                        await tx.event.update({
                            where: {
                                id: Number(eventId)
                            },
                            data: {
                                stock: {
                                    decrement: quantity
                                }
                            }
                        })
                        await tx.point.update({
                            where: {
                                userId: verifiedId
                            },
                            data: {
                                balance: balanceRemainder
                            }
                        })
                        res.status(201).send({
                            error: false,
                            message: "Transaction Success",
                            data: transaction
                        })
                    // if user don't use promotion code
                    } else {
                        let newPrice = event?.price - user.point[0].balance
                        let balanceRemainder = user.point[0].balance - event?.price
                        if (balanceRemainder < 0) {
                            balanceRemainder = 0
                        }

                        transaction = await tx.transaction.create({
                            data: {
                                userId: String(verifiedId),
                                amount: newPrice * quantity
                            }
                        })
                        for (let i = 0; i < quantity; i++) {
                            ticket = await tx.ticket.create({
                                data: {
                                    userId: String(verifiedId),
                                    eventId: Number(eventId),
                                    promotionId: Number(event?.promotions[0]?.id),
                                    price: newPrice,
                                    transactionId: transaction.id
                                }
                            })  
                        }
                        await tx.event.update({
                            where: {
                                id: Number(eventId)
                            },
                            data: {
                                stock: {
                                    decrement: quantity
                                }
                            }
                        })
                        await tx.point.update({
                            where: {
                                userId: verifiedId
                            },
                            data: {
                                balance: balanceRemainder
                            }
                        })
                        res.status(201).send({
                            error: false,
                            message: "Transaction Success",
                            data: transaction
                        })
                    }
                // if user don't use points
                } else if (usePoints == false) {
                    // if user use promotion code
                    if (promotionCode == event?.promotions[0]?.code) {
                        let newPrice = event?.price * event?.promotions[0]?.discountValue/100

                        transaction = await tx.transaction.create({
                            data: {
                                userId: String(verifiedId),
                                amount: newPrice * quantity
                            }
                        })
                        for (let i = 0; i < quantity; i++) {
                            ticket = await tx.ticket.create({
                                data: {
                                    userId: String(verifiedId),
                                    eventId: Number(eventId),
                                    promotionId: Number(event?.promotions[0]?.id),
                                    price: newPrice,
                                    transactionId: transaction.id
                                }
                            })  
                        }
                        await tx.event.update({
                            where: {
                                id: Number(eventId)
                            },
                            data: {
                                stock: {
                                    decrement: quantity
                                }
                            }
                        })
                        res.status(201).send({
                            error: false,
                            message: "Transaction Success",
                            data: transaction
                        })
                    // if user don't use promotion code
                    } else {
                        let newPrice = event?.price - user.point[0].balance

                        transaction = await tx.transaction.create({
                            data: {
                                userId: String(verifiedId),
                                amount: newPrice * quantity
                            }
                        })
                        for (let i = 0; i < quantity; i++) {
                            ticket = await tx.ticket.create({
                                data: {
                                    userId: String(verifiedId),
                                    eventId: Number(eventId),
                                    promotionId: Number(event?.promotions[0]?.id),
                                    price: newPrice,
                                    transactionId: transaction.id
                                }
                            })  
                        }
                        await tx.event.update({
                            where: {
                                id: Number(eventId)
                            },
                            data: {
                                stock: {
                                    decrement: quantity
                                }
                            }
                        })
                        res.status(201).send({
                            error: false,
                            message: "Transaction Success",
                            data: transaction
                        })
                    }
                }
            })

        } catch (error) {
            next({message: "Transaction Failed"})
        }
    }
}