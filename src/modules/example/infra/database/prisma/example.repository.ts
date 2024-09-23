import { PrismaService } from '@/common/infra/database/database.service';
import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { Injectable } from '@nestjs/common';
import { Example as PrismaExample } from '@prisma/client';

@Injectable()
export class PrismaExampleRepository implements IExampleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(example: Example): Promise<void> {
    await this.prismaService.example.create({
      data: this.entityToModel(example),
    });
  }

  async findAll(): Promise<Example[]> {
    const foundExample = await this.prismaService.example.findMany();
    return foundExample.map(this.modelToEntity);
  }

  private modelToEntity(model: PrismaExample): Example {
    return new Example(model);
  }

  private entityToModel(entity: Example): PrismaExample {
    return entity.toJson();
  }
}
