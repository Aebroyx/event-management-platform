import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../lib/jwt";

export interface CustomRequest extends Request {
    verifiedId: any
}
export const tokenVerifyOrg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get Token from Headers
        const token: any = req.headers.authorization

        const payload: any = await jwtVerify(token)
        
        if (!payload) {
            throw {message: "Invalid Token"}
        }

        if(payload.role !== "Organizer") {
            throw {message: "Unauthorized Access"}
        }

        req.headers.authorization = payload.id

        next()
    } catch (error: any) {
        res.status(400).send({
            error: true,
            message: error.message,
            data: null
        })
    }
}

export const tokenVerifyUsr = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
         // Get Token from Headers
         const token: any = req.headers.authorization

         const payload: any = await jwtVerify(token)
         
         if (!payload) {
             throw {message: "Invalid Token"}
         }
 
         if(payload.role !== "User") {
             throw {message: "Unauthorized Access"}
         }
 
         req.headers.authorization = payload.id
 
         next()
    } catch (error: any) {
        res.status(400).send({
            error: true,
            message: error.message,
            data: null
        })
    }
}

export const tokenVerify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get Token from Headers
        const token: any = req.headers.authorization

        const payload: any = await jwtVerify(token)

        if (!payload) {
            throw {message: "Invalid Token"}
        }

        req.headers.authorization = payload.id

        next()
    } catch (error: any) {
        res.status(400).send({
            error: true,
            message: error.message,
            data: null
        })
    }
}