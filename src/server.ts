import fastify, { FastifyInstance } from 'fastify';
import autoload from 'fastify-autoload';
import customHealthCheck from 'fastify-custom-healthcheck';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import path from 'path';
import config from './utils/config';
import Logger from './utils/logger';
import routes from './controllers';

class Server {
  private server: FastifyInstance;

  constructor () {
    this.server = fastify();

    this.setup()
      .then(() => this.addHealthChecks());
  }

  private setup () {
    this.server.decorate('isProduction', config.isProduction);

    return this.server
      .register(sensible)
      .register(cors, config.cors)
      .register(autoload, {
        dir: path.resolve(__dirname, './plugins')
      })
      .register(routes)
      .register(customHealthCheck, config.healthCheck);
  }

  private addHealthChecks () {
    this.server.addHealthCheck('templateCheck', () => true);
  }

  public start () {
    return this.server.listen(config.server.port, '0.0.0.0')
      .then(() => {
        Logger.info(`🚀 Server started on port ${config.server.port}`);
      });
  }
}

export default Server;