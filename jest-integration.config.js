const baseConfig = require('./jest.config');

/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  ...baseConfig,
  testEnvironment: './test/setup/prisma.environment.ts',
  testRegex: ['.test.ts$'],
};

module.exports = jestConfig;
