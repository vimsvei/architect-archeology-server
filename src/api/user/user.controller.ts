import {NextFunction, Request, Response} from 'express';
import {Token} from '../token/token';
import User from './user.model';
import {failed, success} from '../../common/response';
import Employees from '../link/employees/Employees';
import {IUser} from './user.interface';
import logger from '../../common/logger';

export class UserController {

  public async info(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      // const reqToken = (req.body && req.body.access_token)
      //   || (req.query && req.query.access_token) || req.headers['x-access-token'];
      // const reqToken = req.headers['x-access-token'];
      const reqToken = req.body.access_token;
      const token = new Token(null,null, reqToken);

      logger.info(`[API_USER] ${userId}`);
      logger.info(`[API_USER] ${reqToken}`);
      logger.info(`[API_USER] ${JSON.stringify(token, null, '\t')}`);

      if (await token.check()) {
        logger.info(`[API_USER] after check ${JSON.stringify(token, null, '\t')}`);
        const userModel = new User();
        const user: IUser = await userModel.find(token.getSubject());
        const userByUri:IUser = await userModel.findByShortId(userId);
        if (user.id === userByUri.id) {
          res.json(success(user, 'Success', 200));
        } else {
          res.json(failed(null, 'Invalid user', 500));
        }
      } else {
        res.json(failed(null, 'Invalid token', 500));
      }
    } catch (err) {
      console.error(err);
      res.json(failed(err, err.message, 500));
    }
  }

  public async new(req: Request, res: Response, next: NextFunction) {
    try {
      const userModel = new User();
      const user = await userModel.create(req.body);
      res.json(success(user, 'Success', 200));
    } catch (err) {
      res.json(failed(null, err.message, 500));
    }
  }

  public async assignWithCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const companyid = parseInt(req.params.id2);

      const employeeModel = new Employees();
      const employee = await employeeModel.create('User', {id: userId},
        'Company', {id: companyid},
        {status: 'active'});
    } catch (err) {
      res.json(failed(null, err.message, 500));
    }
  }

}
