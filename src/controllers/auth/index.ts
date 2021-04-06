import { FastifyError, FastifyInstance, FastifyRequest } from 'fastify';
import { GithubEmail } from './types';
import fetch from 'node-fetch';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.get('/me', (req, reply) => {
    const { email } = req.session.user;

    reply.send(`Hello ${email}`);
  });

  fastify.get('/logout', (req, reply) => {
    req.destroySession((err) => {
      if (err) {
        return reply.internalServerError();
      }

      reply.send();
    });
  });


  fastify.get('/login/github/callback', async (req, reply) => {
    const { access_token } = await fastify.github.getAccessTokenFromAuthorizationCodeFlow(req);
    const emails: GithubEmail[] = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }).then(d => d.json());
    const verifiedEmail = emails.find(e => e.verified && e.primary);

    req.session.regenerate();
    req.session.user = {
      authenticated: true,
      email: verifiedEmail?.email
    };

    // NOTE: here we should redirect the user to the frontend
    return reply.status(204).send();
  });

  done();
};

