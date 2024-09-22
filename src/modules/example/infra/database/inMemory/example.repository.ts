import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryExampleRepository implements IExampleRepository {
  private readonly examples: any[] = [];

  constructor() {}

  async findAll(): Promise<Example[]> {
    return this.examples;
  }

  async save(example: any): Promise<void> {
    this.examples.push(example);
  }
}
