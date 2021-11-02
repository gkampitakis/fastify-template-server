import { FastifySchema } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    isProduction: boolean;
  }
}

export type Schema = FastifySchema & {
  summary?: string;
  description?: string;
};
