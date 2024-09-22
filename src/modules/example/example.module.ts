import { Module } from '@nestjs/common';
import { CreateExampleUseCase } from './application/useCase/example/create.usecase';
import { GetAllExampleUseCase } from './application/useCase/example/get-all.usecase';
import { InMemoryExampleRepository } from './infra/database/inMemory/example.repository';
import { ExampleController } from './infra/rest/example.controller';

@Module({
  controllers: [ExampleController],
  providers: [InMemoryExampleRepository, CreateExampleUseCase, GetAllExampleUseCase],
})
export class ExampleModule {}
