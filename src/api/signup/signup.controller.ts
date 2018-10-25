import {NextFunction, Request, Response} from 'express';
import User from '../user/user.model';
import Landscape from '../landscape/Landscape';
import Employees from '../link/employees/Employees';
import Include from '../link/include/Include';
import {ICompany} from '../company/company.interface';
import {failed, success} from '../../common/response';
import {Company} from '../company/company.model';

export class SignupController {
  constructor() {

  }

  public async new(req: Request, res: Response, next: NextFunction) {
    try {
      const companyModel = new Company();
      const userModel = new User();
      const landscapeModel = new Landscape();
      const employeeModel = new Employees();
      const includeModel = new Include();

      const company:ICompany = await companyModel.create(req.body.company);
      const user = await userModel.create(req.body.user);
      const landscape = await landscapeModel.create({
        name: 'default',
        code: company.code + '.default'
      });

      const employee = await employeeModel.create('User', {id: user.id},
        'Company', {id: company.id},
        {status:"active"});
      const include = await includeModel.create('Landscape', {id: landscape.id},
        'Company', {id: company.id},
        {});

      const response = {
        company: company,
        user: user,
        landscape: landscape,
        employee: employee,
        include: include
      };

      res.json(success(response, 'Success', 200));
    } catch (err) {
      console.error(err);
      res.json(failed(null, err.message, 500));
    }
  }

}
