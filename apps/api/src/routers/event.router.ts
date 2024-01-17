import { Router } from "express";
import { EventController } from "@/controllers/event.controller";
import { tokenVerify } from "@/middleware/tokenVerification";
import { uploadValidator } from "@/middleware/uploadValidator";

export class EventRouter {
    private router: Router;
    private eventController: EventController;
  
    constructor() {
      this.eventController = new EventController();
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
      this.router.post('/create', tokenVerify, uploadValidator, this.eventController.postCreateEvent);
      this.router.get('/', this.eventController.getAllEvent)
    }
  
    getRouter(): Router {
      return this.router;
    }
}