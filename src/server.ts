import Fastify, { FastifyInstance } from 'fastify';
import autoload from 'fastify-autoload';
import customHealthCheck from 'fastify-custom-healthcheck';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import cookie from 'fastify-cookie';
import session from 'fastify-session';
import closeWithGrace, { CloseWithGraceAsyncCallback } from 'close-with-grace';
import path from 'path';
import { promisify } from 'util';
import config from './utils/config';
import logger from './utils/logger';
import routes from './controllers';

const sleep = promisify(setTimeout);

class Server {
  fastify: FastifyInstance;

  constructor () {
    this.fastify = Fastify({
      logger
    });

    this.setup()
      .then(() => {
        this.addHealthChecks();
        this.handleShutdown();
      });
  }

  private setup () {
    this.fastify.decorate('isProduction', config.isProduction);

    this.fastify.register(sensible);
    this.fastify.register(cors, config.cors);
    this.fastify.register(autoload, {
      dir: path.resolve(__dirname, './plugins')
    });
    this.fastify.register(cookie);
    this.fastify.register(session, {
      secret: 'a secret with minimum length of 32 characters', //TODO: create a secure secret
      cookieName: 'user_session',
      cookie: {
        maxAge: 86400000 * 7, // 1 week
        httpOnly: true,
        secure: config.isProduction,
        sameSite: 'strict'
      }
    });
    this.fastify.register(routes);
    return this.fastify.register(customHealthCheck, config.healthCheck);
  }

  private addHealthChecks () {
    this.fastify.addHealthCheck('templateCheck', () => true);
  }

  private handleShutdown () {
    if (!this.fastify.isProduction) return;

    const fn: CloseWithGraceAsyncCallback = async ({ err, signal }) => {
      if (err) {
        process.exit(1);
      }

      await sleep(config.shutdownDelay);

      this.fastify.log.warn(`Server shutting down with: ${signal}`);

      await this.fastify.close();
    };

    closeWithGrace(fn); // closeWithGrace has a default delay of 10 seconds
  }

  public start () {
    return this.fastify.listen(config.server.port, '0.0.0.0');
  }
}

export default Server;