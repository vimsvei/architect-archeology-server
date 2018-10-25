import * as randomstring from 'randomstring';
import AbctractNode from '../../neo4j/AbctractNode';

export class Company extends AbctractNode {

  constructor() {
    super();
  }

  public async create(properties: any) {
    properties.app_key = randomstring.generate({
      length: 20,
      charset: '0123456789QWERTYUIOPASDFGHJKLZXCVBNM'
    });

    return await super.create(properties);
  }

}
