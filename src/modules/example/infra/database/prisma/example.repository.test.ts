import { PrismaService } from '@/common/infra/database/database.service';
import { Example } from '@/modules/example/domain/entity/example.entity';
import { PrismaClient } from '@prisma/client';
import { PrismaExampleRepository } from './example.repository';

describe('[Integration] Example prisma repository', () => {
  const makeSut = () => {
    const prismaService = new PrismaService();
    const sut = new PrismaExampleRepository(prismaService);
    const prismaClient = new PrismaClient();

    return {
      sut,
      prismaClient,
    };
  };

  const setupDB = async (prismClient: PrismaClient) => {
    const fakeExample = Example.create({ name: 'Example 1' });
    await prismClient.example.create({
      data: fakeExample.toJson(),
    });

    return {
      fakeExample,
    };
  };

  afterEach(async () => {
    const { prismaClient } = makeSut();
    await prismaClient.$transaction([prismaClient.example.deleteMany()]);
  });

  it('should return example list correctly', async () => {
    const { sut, prismaClient } = makeSut();
    const { fakeExample } = await setupDB(prismaClient);

    const exampleList = await sut.findAll();

    expect(exampleList).toHaveLength(1);
    expect(exampleList[0].toJson()).toStrictEqual(fakeExample.toJson());
  });

  it('should create example correctly', async () => {
    const { sut, prismaClient } = makeSut();
    const fakeExample = Example.create({ name: 'Example 1' });

    await sut.save(fakeExample);

    const persistedExample = await prismaClient.example.findUnique({
      where: {
        id: fakeExample.toJson().id,
      },
    });
    expect(persistedExample).toStrictEqual(fakeExample.toJson());
  });
});
