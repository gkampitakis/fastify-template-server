import fastify, { FastifyInstance } from 'fastify';
import customHealthCheck from "fastify-custom-healthcheck";
import config, { logger } from './config';
import cors from 'fastify-cors';
import Logger from './utils/logger'

class Server {
  private server: FastifyInstance;

  constructor () {
    this.server = fastify();
    this.setup();
  }

  private setup (): void {
    this.server
      .register(cors, config.cors)
      .register(customHealthCheck, config.healthCheck)

    // registerRoutes(this.server);
  }

  public start () {
    return this.server.listen(config.server.port, '0.0.0.0')
      .then(() => {
        Logger.info(`🚀 Server started on port ${config.server.port}`);
      })
  }
}

export default new Server();