import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { InMemoryExampleRepository } from '@/modules/example/infra/database/inMemory/example.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateExampleInput } from '../types/examples';
import { UseCase } from '../types/useCase';

@Injectable()
export class CreateExampleUseCase implements UseCase<CreateExampleInput, void> {
  constructor(
    @Inject(InMemoryExampleRepository)
    private readonly exampleRepository: IExampleRepository,
  ) {}

  async execute(input: CreateExampleInput): Promise<void> {
    const example = Example.create(input);
    return this.exampleRepository.save(example);
  }
}
