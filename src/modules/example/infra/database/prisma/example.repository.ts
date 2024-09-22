import { prismaClient } from '@/common/infra/prisma/prisma-client';
import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { Injectable } from '@nestjs/common';
import { Example as PrismaExample } from '@prisma/client';

@Injectable()
export class PrismaExampleRepository implements IExampleRepository {
  constructor() {}

  async save(example: Example): Promise<void> {
    await prismaClient.example.create({
      data: this.entityToModel(example),
    });
  }

  async findAll(): Promise<Example[]> {
    const foundExample = await prismaClient.example.findMany();
    return foundExample.map(this.modelToEntity);
  }

  private modelToEntity(model: PrismaExample): Example {
    return new Example({
      id: model.id,
      name: model.name,
    });
  }

  private entityToModel(entity: Example): PrismaExample {
    const data = entity.toJson();
    return {
      id: data.id,
      name: data.name,
    };
  }
}
