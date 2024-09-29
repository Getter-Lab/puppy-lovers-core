import { Example, ExampleProps } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryExampleRepository implements IExampleRepository {
  private readonly examples: ExampleProps[] = [];

  constructor() {}

  async findAll(): Promise<Example[]> {
    return this.examples.map(Example.create);
  }

  async save(example: Example): Promise<void> {
    this.examples.push(example.toJson());
  }
}
