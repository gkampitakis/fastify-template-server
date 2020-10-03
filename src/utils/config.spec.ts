describe('Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('Production config', () => {
    it('Default config', () => {
      process.env.NODE_ENV = 'prd';
      const config = require('./config').default;

      expect(config).toEqual({
        server: {
          port: 4000
        },
        isProduction: true,
        cors: {
          origin: '*'
        },
        healthCheck: {
          exposeFailure: true,
          info: { Service: 'Template' },
          path: '/api/health'
        }
      });
    });

    it('Logger', () => {
      process.env.NODE_ENV = 'prd';

      const { logger } = require('./config');

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
    it('Default config', () => {
      process.env.NODE_ENV = 'dev';
      const config = require('./config').default;

      expect(config).toEqual({
        server: {
          port: 4000
        },
        isProduction: false,
        cors: {
          origin: '*'
        },
        healthCheck: {
          exposeFailure: true,
          info: { Service: 'Template' },
          path: '/api/health'
        }
      });
    });

    it('Logger', () => {
      process.env.NODE_ENV = 'dev';

      const { logger } = require('./config');

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