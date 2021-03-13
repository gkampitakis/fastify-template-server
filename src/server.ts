import fastify, { FastifyInstance } from 'fastify';
import autoload from 'fastify-autoload';
import customHealthCheck from 'fastify-custom-healthcheck';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import closeWithGrace, { CloseWithGraceAsyncCallback } from 'close-with-grace';
import path from 'path';
import { promisify } from 'util';
import config from './utils/config';
import logger from './utils/logger';
import routes from './controllers';

const sleep = promisify(setTimeout);

class Server {
  private server: FastifyInstance;

  constructor () {
    this.server = fastify({
      logger
    });

    this.setup()
      .then(() => {
        this.addHealthChecks();
        this.handleShutdown();
      });
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

  private handleShutdown () {
    const fn: CloseWithGraceAsyncCallback = async ({ err, signal }) => {
      if (err) {
        process.exit(1);
      }

      await sleep(config.shutdownDelay);

      this.server.log.info(`Server shutting down with: ${signal}`);

      await this.server.close();
    };

    closeWithGrace(fn); // closeWithGrace has a default delay of 10 seconds
  }

  public start () {
    return this.server.listen(config.server.port, '0.0.0.0');
  }
}

export default Server;