import * as uuid from 'uuid/v1';
import * as randomstring from 'randomstring';
import { head, isBoolean, isNull, isNumber } from 'lodash';
import { parse } from 'parse-neo4j';
import AbstractGraphObject from "./AbstractGraphObject";

export default class AbstractLink extends AbstractGraphObject {
  public id: string;
  public label: string;

  constructor() {
    super();
	this.label = this.constructor.name;
	this.id = 'id';
  }

  public async create(nodeALabel:string, nodeAProperties:any,
					  nodeBLabel:string, nodeBProperties:any,
					  linkProperties){
	const now = new Date().toISOString();
	linkProperties.id = uuid();
	linkProperties.short_id = randomstring.generate({
	  length: 6,
	  charset: '0123456789QWERTYUIOPASDFGHJKLZXCVBNM',
	  capitalization:'uppercase'
	});
	linkProperties.created_at = now;
	linkProperties.updated_at = now;
	const query = `
            MATCH (nodeA:${nodeALabel} { ${super.__matchProperties(nodeAProperties)} })
            MATCH (nodeB:${nodeBLabel} { ${super.__matchProperties(nodeBProperties)} })
            CREATE (nodeA)-[link:${this.label} {${super.__matchProperties(linkProperties)}}]->(nodeB)
            RETURN link
        `;
	return head(await parse(await super.__run(query)));
  }
}
