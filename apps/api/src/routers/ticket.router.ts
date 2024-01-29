import { Router } from "express";
import { TicketController } from "@/controllers/ticket.controller";
import { tokenVerifyUsr } from "@/middleware/tokenVerification";

export class TicketRouter {
    private router: Router;
    private ticketController: TicketController;

    constructor() {
        this.ticketController = new TicketController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/purchase', tokenVerifyUsr, this.ticketController.postTicket)
        this.router.post('/transaction', tokenVerifyUsr, this.ticketController.getTicketbyId)
    }

    getRouter(): Router {
        return this.router;
    }
}