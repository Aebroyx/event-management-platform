import { Router } from "express";
import { EventController } from "@/controllers/event.controller";
import { tokenVerify } from "@/middleware/tokenVerification";

export class EventRouter {
    private router: Router;
    private eventController: EventController;
  
    constructor() {
      this.eventController = new EventController();
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
      this.router.post('/create', tokenVerify, this.eventController.postCreateEvent);
    }
  
    getRouter(): Router {
      return this.router;
    }
}