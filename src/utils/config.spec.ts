describe('Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('Production config', () => {
    it('Default config', async () => {
      process.env.NODE_ENV = 'production';
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
          exposeFailure: true,
          info: { Service: 'Template' },
          path: '/api/health'
        },
        shutdownDelay: 5000
      });
    });

    it('Logger', async () => {
      process.env.NODE_ENV = 'production';

      const { logger } = await import('./config');

      expect(logger).toEqual({
        level: 'info',
        base: {
          name: 'Template'
        },
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
          info: { Service: 'Template' },
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
          name: 'Template'
        },
        prettyPrint: {
          colorize: true,
          ignore: 'hostname,pid',
          translateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss',
          levelFirst: true
        }
      });
    });
  });
});