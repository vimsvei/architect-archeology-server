import { Router } from 'express';

import {AuthController} from './auth.controller';

export class AuthRouter {
  router: Router;
  controller: AuthController;

  constructor(){
	this.router = Router();
	this.controller = new AuthController();
	this.init();
  }

  init(){
    // получение набора токенов для авторизации
    this.router.post('/', this.controller.auth);
    // получение обновленного токена по refresh-токену
    this.router.get ('/refresh', this.controller.refresh);
  }
}
const authRouter = new AuthRouter();
authRouter.init();

export default authRouter.router;
