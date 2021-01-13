import S from 'fluent-json-schema';
import { FastifySchema } from 'fastify';

export const defaultSchema: FastifySchema = {
  response: {
    200: S.string()
  }
};

export const helloSchema: FastifySchema = {
  querystring: S.object()
    .prop('name', S.string().minLength(1)),
  response: {
    200: S.string()
  }
};