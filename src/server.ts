import fastify, { FastifyInstance } from 'fastify';
import customHealthCheck from 'fastify-custom-healthcheck';
import config from './utils/config';
import cors from 'fastify-cors';
import Logger from './utils/logger';
import registeredRoutes from './routes';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

class Server {
  private server: FastifyInstance;

  constructor () {
    this.server = fastify();

    this.setup()
      .then(() => this.addHealthChecks());
  }

  private setup () {
    this.server.register(registeredRoutes);
    this.gracefulShutdown();

    return this.server
      .register(cors, config.cors)
      .register(customHealthCheck, config.healthCheck);
  }

  private addHealthChecks () {
    this.server.addHealthCheck('templateCheck', () => true);
  }

  private gracefulShutdown () {
    const shutdown = async () => {
      Logger.info('Server gracefully shutting down');

      await delay(5000);

      this.server
        .close()
        .then(() => {
          // NOTE: here you can close other open connections (e.g. db connections)

          Logger.info('Server shutting down');
          process.exit(0);
        }, (e) => {
          Logger.error(e);
          process.exit(1);
        });
    };

    for (const signal of ['SIGTERM', 'SIGINT']) {
      // Use once() so that double signals exits the app
      process.once(signal as any, shutdown);
    }
  }

  public start () {
    return this.server.listen(config.server.port, '0.0.0.0')
      .then(() => {
        Logger.info(`🚀 Server started on port ${config.server.port}`);
      });
  }
}

export default Server;