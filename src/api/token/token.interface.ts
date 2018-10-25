export interface ITokenHeader {
  alg: string;
  typ: string;
}

export interface ITokenPayload {
  sub: string;
  cmp: string;
  iss: string;
  iat?: string;
  exp?: string;
}

export interface IToken {
  header: ITokenHeader;
  payload: ITokenPayload;
  signature: string;
}

// {
//   "cmp": "db9993a0-d311-11e8-8403-8730a7b86236",
//   "iat": 1539897115,
//   "exp": 1539925915,
//   "iss": "Architect Archeology's REST API server",
//   "sub": "andrew@gmail.com"
// }
