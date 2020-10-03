import fastify, { FastifyInstance } from 'fastify';
import customHealthCheck from 'fastify-custom-healthcheck';
import config from './utils/config';
import cors from 'fastify-cors';
import Logger from './utils/logger';
import registerRoutes from './routes';

class Server {
  private server: FastifyInstance;

  constructor () {
    this.server = fastify();

    this.setup()
      .then(() => this.addHealthChecks())
  }

  private setup () {
    registerRoutes(this.server);

    return this.server
      .register(cors, config.cors)
      .register(customHealthCheck, config.healthCheck);
  }

  private addHealthChecks () {
    this.server.addHealthCheck('templateCheck', () => true);
  }

  public start () {
    return this.server.listen(config.server.port, '0.0.0.0')
      .then(() => {
        Logger.info(`🚀 Server started on port ${config.server.port}`);
      })
  }
}

export default Server;