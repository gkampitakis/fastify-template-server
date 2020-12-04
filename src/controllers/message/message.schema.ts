import S from 'fluent-schema';
import { FastifySchema } from 'fastify';

export const pushMessage: FastifySchema = {
  response: {
    200: S.string()
  }
};