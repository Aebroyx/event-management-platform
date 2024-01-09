import { Request, Response, NextFunction } from 'express';

import prisma from '@/prisma';

export class UserRouter {
    async postRegister(req: Request, res: Response) {
        const { name, email, password } = req.body;
    }
}