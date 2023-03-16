/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
   'src/**/*.ts',
  ],
  testEnvironment: 'node',
  clearMocks: true,
}