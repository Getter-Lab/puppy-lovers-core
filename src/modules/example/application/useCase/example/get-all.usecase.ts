import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { InMemoryExampleRepository } from '@/modules/example/infra/database/inMemory/example.repository';
import { Inject } from '@nestjs/common';
import { GetAllExampleOutput } from '../types/examples';
import { UseCase } from '../types/useCase';

export class GetAllExampleUseCase implements UseCase<unknown, GetAllExampleOutput> {
  constructor(
    @Inject(InMemoryExampleRepository)
    private readonly exampleRepository: IExampleRepository,
  ) {}

  async execute(): Promise<GetAllExampleOutput> {
    const foundExamples = await this.exampleRepository.findAll();
    return foundExamples.map((example) => ({
      name: example.toJson().name,
    }));
  }
}
