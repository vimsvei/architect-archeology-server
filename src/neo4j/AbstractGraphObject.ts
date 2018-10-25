import * as jsStringEscape from 'js-string-escape';
import { head, isBoolean, isNull, isNumber } from 'lodash';

import Neo4j from "./Neo4j";
import logger from "../common/logger";

export default class AbstractGraphObject {
  public db: any;

  constructor(){
	this.db = Neo4j;
  }

  protected async __run(query: string) {
	try {
	  const session  = this.db.session();
	  const result = await session.run(query);
	  logger.info(`[NEO4J] ${query.replace(/\s\s+/g, ' ').trim()}`);
	  logger.info(`[NEO4J_RESULT] ${JSON.stringify(result)}`);
	  session.close();
	  return result;
	} catch (error) {
	  const errMessage = `[NEO4J] ${error.message}`;
	  logger.warn(`[NEO4J] ${query.replace(/\s\s+/g, ' ').trim()}`);
	  logger.error(errMessage);
	  throw new Error(errMessage);
	}
  }

  protected __matchProperties(properties: object) {
	const propArray = [];
	for (const property in properties) {
	  if (properties[property] !== undefined) {
		const prop = properties[property];
		if (isNumber(prop) || isNull(prop) || isBoolean(prop)) {
		  propArray.push(`${property}: ${prop}`);
		} else{
		  propArray.push(`${property}: '${jsStringEscape(properties[property])}'`);
		}
	  }
	}
	return propArray.join(', ');
  }

}
