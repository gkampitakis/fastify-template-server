import fastify, { FastifyInstance } from 'fastify';
import customHealthCheck from 'fastify-custom-healthcheck';
import fastifyKafka from 'fastify-kafka';
import config from './utils/config';
import cors from 'fastify-cors';
import Logger from './utils/logger';
import registeredRoutes from './routes';

class Server {
  private server: FastifyInstance;

  constructor () {
    this.server = fastify();

    this.setup();
  }

  private async setup () {
    this.server
      .register(registeredRoutes)
      .register(cors, config.cors)
      .register(customHealthCheck, config.healthCheck)
      .register(fastifyKafka, config.kafka);

    await this.server.ready();

    this.addHealthChecks();
    this.setupKafka();
  }

  private setupKafka () {
    this.server.kafka.subscribe(['message']);
    this.server.kafka.consume();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.server.kafka.on('message', (data, commit) => {
      console.log(data.value.toString());
      commit();
    });
  }

  private addHealthChecks () {
    //TODO: add health check for kafka
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