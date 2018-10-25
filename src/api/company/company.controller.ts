import {NextFunction, Request, Response} from 'express';
import {failed, success} from '../../common/response';
import {Company} from './company.model';
import {ICompany} from './company.interface';

export class CompanyController {

  public async new(req: Request, res: Response, next: NextFunction) {
    try {
      const companyModel = new Company();
      const company:ICompany = await companyModel.create(req.body);
      res.json(success(company, 'Success', 200));
    } catch (err) {
      res.json(failed(null, err.message, 500));
    }
  }

  public async getComponentList(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
      res.json(failed(null, err.message, 500));
    }
  }

}
