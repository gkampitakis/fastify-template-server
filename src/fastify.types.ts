import { FastifySchema } from 'fastify';
import { OAuth2Namespace } from 'fastify-oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    isProduction: boolean;
    github: OAuth2Namespace;
    authorize: (req: FastifyRequest, reply: FastifyReply) => void;
  }
}

export type Schema = FastifySchema & {
  summary?: string;
  description?: string;
};
