import {Router} from 'express';
import {CompanyController} from './company.controller';

class CompanyRouter {
  public router: Router;
  public controller: CompanyController;

  constructor(){
    this.router = Router();
    this.controller = new CompanyController();
    this.init();
  }

  init() {
    this.router.post("/", this.controller.new);
    this.router.get ("/:companyId/components")
  }
}
const companyRouter = new CompanyRouter();
companyRouter.init();

export default companyRouter.router;
