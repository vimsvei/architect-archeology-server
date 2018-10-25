import {Router} from 'express';
import {ComponentController} from './component.controller';

export class ComponentRouter {
  public router: Router;
  public controller: ComponentController;

  constructor(){
    this.router = Router();
    this.controller = new ComponentController();
    this.init();
  }

  init() {
    this.router.get ("/", this.controller.list);
    this.router.post("/", this.controller.new);
  }

}
