import { Router } from "express";
import { EventController } from "@/controllers/event.controller";
import { tokenVerifyOrg, tokenVerifyUsr } from "@/middleware/tokenVerification";
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
      this.router.post('/create', tokenVerifyOrg, uploadValidator, this.eventController.postCreateEvent);
      this.router.get('/', this.eventController.getAllEvent)
      this.router.get('/:id', this.eventController.getEventById)
      this.router.post('/promotion', tokenVerifyOrg, this.eventController.postEventPromotion)
      this.router.post('/review', tokenVerifyUsr, this.eventController.postEventReview)
    }
  
    getRouter(): Router {
      return this.router;
    }
}