import {NextFunction, Request, Response} from 'express';
import {TokenController} from '../token/token.controller';
import {Token} from '../token/token';
import {failed, success} from '../../common/response';
import {Component} from './component.model';
import AbstractLink from '../../neo4j/AbstractLink';
import {Owned} from '../link/owned/owned.model';

export class ComponentController {
  private model: Component;

  constructor() {
    this.model = new Component();
  }

  public async new (req: Request, res: Response, next: NextFunction) {
    try {
      const token = new Token(null, null, req.body.access_token);
      if (await token.check()) {
        const component = await this.model.create(req.body.component);
        const ownedModel = new Owned();
        // const owned = await ownedModel.create()
      } else {
        res.json(failed(null, 'Invalid token', 500));
      }
    } catch (err) {
      res.json(failed(null, err.message, 500));
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const token = new Token(null, null, req.body.access_token);
      if (await token.check()) {
        const collection = await this.model.listAll({id: token.getCompany()});
        res.json(success(collection, 'Success', 200));
      } else {
        res.json(failed(null, 'Invalid token', 500));
      }
    } catch (err) {
      res.json(failed(null, err.message, 500));
    }
  }
}
