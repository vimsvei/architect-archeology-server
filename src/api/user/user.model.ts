import * as bcrypt from 'bcrypt';
import { head, isBoolean, isNull, isNumber } from 'lodash';
import { parse } from 'parse-neo4j';

import AbctractNode from "../../neo4j/AbctractNode";
import {IUser} from './user.interface';
import {ICompany} from '../company/company.interface';

export default class User extends AbctractNode {
  public login: string;
  public employer: string;
  public shortid: string;

  constructor() {
	super();
	this.login = 'login';
	this.shortid = 'short_id';
	this.employer = 'Company';
  }

  public async findByLogin(login: string) {
	const query = `
	MATCH (node:${this.label} { ${this.login}: '${login}' })
	RETURN node 
	`;
	return <IUser>head(await parse(await super.__run(query)));
  }

  public async findByShortId(shortid: string) {
    const query = `
	MATCH (node:${this.label} { ${this.shortid}: '${shortid}' })
	RETURN node 
	`;
    return <IUser>head(await parse(await super.__run(query)));
  }

  public async getEmployer(id: string) {
	const query = `
	MATCH (:${this.label} { ${this.id}: '${id}' }
	)-[:Employees]->(node:${this.employer})
	RETURN node
	`;
	return <ICompany>head(await parse(await super.__run(query)));
  }

  public async create(properties: any) {
	properties.login = properties.email;
	properties.password = bcrypt.hashSync(properties.password, bcrypt.genSaltSync(10));

	return await super.create(properties);
  }

}
