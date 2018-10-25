import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import CompanyRouter from './api/company/company.router';
import SignupRouter from './api/signup/signup.router';
import AuthRouter from './api/auth/auth.router';
import UserRouter from './api/user/user.router';
import config from './config';
import {failed} from './common/response';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  private exeption(): void {
	this.express.use((err, req, res, next) => {
	  if (!err.httpCode) {
		err.httpCode = 500;
	  }
	  const body = failed(err.body, err.message, err.httpCode);
	  res
		.status(err.httpCode)
		.json(body);
	});
	this.express.use((req, res, next) => {
	  const body = failed(null, 'Not Found', 404);
	  res
		.status(404)
		.json(body);
	});
  }

  private routes(): void {
	const router = express.Router();
	router.get('/', (req, res, next) => {
	  res.json({
        message: config.api.name
      });
    });
	this.express.use('/', router);
	this.express.use('/auth', AuthRouter);
	this.express.use('/user', UserRouter);
	this.express.use('/signup', SignupRouter);
	this.express.use('/company', CompanyRouter);
  }
}

export default new App().express;
