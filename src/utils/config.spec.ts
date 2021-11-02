describe('Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.SERVICE = 'test service';
  });

  describe('Production config', () => {
    it('Default config', async () => {
      process.env.NODE_ENV = 'production';
      process.env.SERVICE = '';
      const { default: config } = await import('./config');

      expect(config).toEqual({
        server: {
          port: 4000
        },
        isProduction: true,
        cors: {
          origin: false
        },
        healthCheck: {
          exposeFailure: false,
          info: { Service: '' },
          path: '/api/health'
        },
        shutdownDelay: 5000
      });
    });

    it('Logger', async () => {
      process.env.NODE_ENV = 'production';

      const { logger } = await import('./config');

      expect(logger).toEqual({
        level: 'warn',
        base: {
          name: 'test service'
        },
        enabled: true,
        prettyPrint: false
      });
    });
  });

  describe('Development config', () => {
    it('Default config', async () => {
      process.env.NODE_ENV = 'dev';
      const { default: config } = await import('./config');

      expect(config).toEqual({
        server: {
          port: 4000
        },
        isProduction: false,
        cors: {
          origin: false
        },
        healthCheck: {
          exposeFailure: true,
          info: { Service: 'test service' },
          path: '/api/health'
        },
        shutdownDelay: 5000
      });
    });

    it('Logger', async () => {
      process.env.NODE_ENV = 'dev';

      const { logger } = await import('./config');

      expect(logger).toEqual({
        level: 'debug',
        base: {
          name: 'test service'
        },
        enabled: true,
        prettyPrint: {
          colorize: true,
          ignore: 'hostname,pid',
          translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss",
          levelFirst: true
        }
      });
    });
  });
});
