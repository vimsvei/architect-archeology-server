import { parse } from 'parse-neo4j';
import AbctractNode from '../../neo4j/AbctractNode';
import {IComponent} from './component.interface';

export class Component extends AbctractNode {
  private owned: string;

  constructor() {
    super();
    this.owned = 'Company';
  }

  public async listAll(propertiesOwned: object) {
    const query = `
    MATCH (node:${this.label})-[:Owned]->(:${this.owned}{${super.__matchProperties(propertiesOwned)})
    RETURN node
    `;
    return <IComponent[]>(await parse(await super.__run(query)));
  }

}
