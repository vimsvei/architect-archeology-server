import * as uuid from 'uuid/v1';
import * as randomstring from 'randomstring';
import { head, isBoolean, isNull, isNumber } from 'lodash';
import { parse } from 'parse-neo4j';

import AbstractGraphObject from "./AbstractGraphObject";
import logger from "../common/logger";


export default class AbctractNode extends AbstractGraphObject{

  public id: string;
  public label: string;

  constructor() {
  	super();
  	this.label = this.constructor.name;
    this.id = 'id';
  }

  protected getLabel() {
  	return this.label;
  }

  public async find(id: string) {
	const query = `
	MATCH (node:${this.label} { ${this.id}: '${id}' }) 
	RETURN node
	`;
	return head(await parse(await super.__run(query)));
  }

  public async list(properties: object) {
    const query = `
	MATCH (node:${this.label} { ${super.__matchProperties(properties)} }) 
	RETURN node
	`;
    return await parse(await super.__run(query));
  }

  public async value(properties: object, value: string) {
	const query = `
            MATCH (node:${this.label} {${super.__matchProperties(properties)}})
            RETURN node.${value}
        `;
	return await parse(await super.__run(query));
  }

  public async where(properties: object) {
	const query = `
            MATCH (node:${this.label} {${super.__matchProperties(properties)}})
            RETURN node
        `;
	return await parse(await super.__run(query));
  }

  public async create(properties: any) {
	const now = new Date().toISOString();
	properties.id = uuid();
	properties.short_id = randomstring.generate({
	  length: 6,
	  charset: '0123456789QWERTYUIOPASDFGHJKLZXCVBNM',
	  capitalization: 'uppercase'
	});
	properties.created_at = now;
	properties.updated_at = now;
	const query = `
            CREATE (node:${this.label} { ${super.__matchProperties(properties)} })
            RETURN node
        `;
	return head(await parse(await super.__run(query)));
  }

  public async update(id: string, properties: any) {
	const now = new Date().toISOString();
	properties.updated_at = now;
	const query = `
            MATCH (node:${this.label} {${this.id}: '${id}'})
            SET node += {${super.__matchProperties(properties)}}
            RETURN node
        `;
	return head(await parse(await super.__run(query)));
  }
}
