import {IToken, ITokenPayload} from './token.interface';
import { sign, decode, verify } from 'jsonwebtoken';
import config from '../../config';
import {IUser} from '../user/user.interface';
import {ICompany} from '../company/company.interface';
import User from '../user/user.model';
import {Company} from '../company/company.model';
import logger from '../../common/logger';


export class Token {
  private token: string;
  private user: IUser;
  private company: ICompany;
  private payload: ITokenPayload;
  private isValidate: boolean;
  public name: string;

  constructor(user?: IUser, company?: ICompany, token?: string) {
    try {
      if(token) {
        this.token = token;
      }
      if (user && company) {
        this.user = user;
        this.company = company;
        this.token = this.generate()
      }
      this.name = this.constructor.name;
    } catch (err) {
      logger.error(`[MODEL: ${this.name}] ${err.message}`);
    }
  }

  protected generate(){
    return sign({
      cmp: this.company.id
    },
      this.company.app_key,
      {
      subject: this.user.id,
      expiresIn: config.token.expiresIn,
      issuer: config.api.name
    });
  }

  protected async decode() {
    return await <IToken>decode(this.token,{complete: true})
  }

  protected async validate(payload: ITokenPayload) {
    try {
      const company = <ICompany>(await new Company().find(payload.cmp));
      return await <ITokenPayload>verify(this.token, company.app_key);
    } catch(err) {
      logger.error(`[MODEL: ${this.name}] validate(): ${err.message}`);
      console.error(err);
    }
  }

  public async get(){
    return this.token;
  }

  public async check() {
    try {
      const decode:IToken = await this.decode();
      logger.info(`[MODEL: ${this.name}] after decode() ${JSON.stringify(decode, null, '\t')}`);
      this.payload = await this.validate(decode.payload);
      logger.info(`[MODEL: ${this.name}] after validate() ${JSON.stringify(this.payload, null, '\t')}`);
      this.isValidate = true;
      if (this.payload !== null) {
        return this.isValidate;
      }
    } catch (err) {
      logger.warn(`[MODEL: ${this.name}] getSubject() ${JSON.stringify(this, null, '\t')}`);
      logger.error(`[MODEL: ${this.name}] check(): ${err.message}`);
    }
  }

  public getSubject() {
    logger.info(`[MODEL: ${this.name}] getSubject() ${JSON.stringify(this, null, '\t')}`);
    return this.payload.sub;
  }

  public getCompany() {
    logger.info(`[MODEL: ${this.name}] getCompany() ${JSON.stringify(this, null, '\t')}`);
    return this.payload.cmp;
  }

}
