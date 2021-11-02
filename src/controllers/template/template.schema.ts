import S from 'fluent-json-schema';
import { Schema } from '../../fastify.types';

export const defaultSchema: Schema = {
  response: {
    200: S.string()
  }
};

export const helloSchema: Schema = {
  summary: 'Placeholder',
  description: 'Placeholder description',
  params: S.object().prop('name', S.string().minLength(1)),
  response: {
    200: S.string()
  }
};
