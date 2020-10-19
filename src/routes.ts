import { FastifyInstance, FastifyError } from 'fastify';
import Routes from './controllers';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void) => {
  fastify.register(Routes);

  done();
}