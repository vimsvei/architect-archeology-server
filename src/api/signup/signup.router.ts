import {Router} from "express";
import { get, head, isBoolean, isNull, isNumber } from 'lodash';
import {SignupController} from './signup.controller';

export class SignupRouter {
  public router: Router;
  controller: SignupController

  constructor(){
	this.router = Router();
	this.controller = new SignupController();
	this.init();
  }

  init() {
    this.router.post('/', this.controller.new);
  }
}

const signupRouter = new SignupRouter();
signupRouter.init();
export default signupRouter.router;
