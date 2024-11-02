import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { Injectable } from '@nestjs/common';
import { GetAllExampleOutput } from './types/examples';
import { UseCase } from './types/useCase';

@Injectable()
export class GetAllExampleUseCase implements UseCase<unknown, GetAllExampleOutput> {
  constructor(private readonly exampleRepository: IExampleRepository) {}

  async execute(): Promise<GetAllExampleOutput> {
    const foundExamples = await this.exampleRepository.findAll();
    return foundExamples.map((example) => example.toJson());
  }
}
