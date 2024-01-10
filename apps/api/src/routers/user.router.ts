import { Router } from "express";
import { UserController } from "@/controllers/user.controller";

export class UserRouter {
    private router: Router;
    private userController: UserController;
  
    constructor() {
      this.userController = new UserController();
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
      this.router.post('/register', this.userController.postRegister);
    }
  
    getRouter(): Router {
      return this.router;
    }
  }