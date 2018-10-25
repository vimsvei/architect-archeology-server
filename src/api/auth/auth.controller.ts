import {NextFunction, Request, Response} from "express";
import {compareSync} from "bcrypt";
import { sign } from 'jsonwebtoken';
import User from "../user/user.model";
import {failed, success} from "../../common/response";
import config from "../../config";
import {IUser} from '../user/user.interface';
import {ICompany} from '../company/company.interface';
import {Token} from '../token/token';
import logger from '../../common/logger';

export class AuthController {

  public async auth(req: Request, res: Response, next: NextFunction) {
	try {
      const userModel = new User();
      const user: IUser = await userModel.findByLogin(req.body.login);
	  if (compareSync(req.body.password, user.password)) {
		const company: ICompany = await userModel.getEmployer(user.id);
		let token = new Token(user, company);
		const token_string = await token.get();
		logger.info(`[API] auth ${JSON.stringify(success(token_string, 'Success', 200), null, '\t')}`);
		res.json(success(token_string, 'Success', 200));
	  } else {
		res.json(failed(null, 'Wrong Password', 500));
	  }
	} catch (err) {
	  console.error(err);
	  res.json(failed(null, err.message, 500));
	}
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {

  }
}
