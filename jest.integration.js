module.exports = {
  globals: {
    'ts-jest:': {
      diagnostics: false
    }
  },
  setupFiles: ['./src/setupTests.ts'],
  verbose: true,
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(integration))\\.ts$'
};