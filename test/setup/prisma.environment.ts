import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { TestEnvironment } from 'jest-environment-node';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { prismaClient } from '../../src/common/infra/prisma';

const execCP = promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

class PrismaTestEnvironment extends TestEnvironment {
  private schema: string;
  private connectionString: string;

  constructor({ globalConfig, projectConfig }, context) {
    super({ globalConfig, projectConfig }, context);
    dotenv.config({ path: '.env.test', override: true });
    this.schema = `test_${randomUUID()}`;
    this.connectionString = process.env.DATABASE_URL!.replace('schema=test', `schema=${this.schema}`);
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execCP(`${prismaBinary} migrate reset --force`);
    return super.setup();
  }

  async teardown() {
    await super.teardown();
    await prismaClient.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE;`);
    await prismaClient.$disconnect();
  }
}

export default PrismaTestEnvironment;
