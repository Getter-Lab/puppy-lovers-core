import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { Injectable } from '@nestjs/common';
import { CreateExampleInput } from './types/examples';
import { UseCase } from './types/useCase';

@Injectable()
export class CreateExampleUseCase implements UseCase<CreateExampleInput, void> {
  constructor(private readonly exampleRepository: IExampleRepository) {}

  async execute(input: CreateExampleInput): Promise<void> {
    const example = Example.create(input);
    return this.exampleRepository.save(example);
  }
}
