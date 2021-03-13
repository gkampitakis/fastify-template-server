module.exports = {
  globals: {
    'ts-jest:': {
      diagnostics: false
    }
  },
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