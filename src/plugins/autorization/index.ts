import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Oauth2 from 'fastify-oauth2';
import fp from 'fastify-plugin';

async function authorization (fastify: FastifyInstance, options: unknown) {
  fastify.register(Oauth2, {
    name: 'github',
    credentials: {
      client: {
        id: '***', // TODO: add as env
        secret: '*****'
      },
      auth: Oauth2.GITHUB_CONFIGURATION
    },
    startRedirectPath: '/auth/login/github',
    callbackUri: 'http://localhost:4000/auth/login/github/callback', //TODO: from a config
    scope: ['user:email', 'read:user']
  });

  fastify.decorate('authorize', authorize);

  async function authorize (req: FastifyRequest, reply: FastifyReply) {
    const { user } = req.session;

    req.session.touch();

    if (!user) {
      throw fastify.httpErrors.unauthorized('Missing session');
    }
  }
}

export default fp(authorization, {
  name: 'authorization'
});
