import {Router} from "express";
import {UserController} from './user.controller';

export class UserRouter {
  public router: Router;
  public controller: UserController;

  constructor() {
	this.router = Router();
	this.controller = new UserController();
	this.init();
  }

  init() {
  	this.router.post('/', this.controller.new);
  	this.router.get ('/:id', this.controller.info);
  	this.router.post('/:id/company/:id2', this.controller.assignWithCompany);
  }
}
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
