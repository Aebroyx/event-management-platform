import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { tokenVerify } from "@/middleware/tokenVerification";

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
      this.router.post('/login', this.userController.postLogin);
      this.router.post('/keeplogin', tokenVerify, this.userController.postKeepLogin);
      this.router.post('/profile', tokenVerify, this.userController.postGetUser);
    }
  
    getRouter(): Router {
      return this.router;
    }
  }