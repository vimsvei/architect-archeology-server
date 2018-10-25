import {Token} from './token';

export class TokenController {
  private token: Token;

  constructor(reqToken: string) {
    this.token = new Token(null, null, reqToken);
  }

}
