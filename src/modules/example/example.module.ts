import { DatabaseModule } from '@/common/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateExampleUseCase } from './application/useCase/create.usecase';
import { GetAllExampleUseCase } from './application/useCase/get-all.usecase';
import { IExampleRepository } from './domain/repository/example.repository';
import { PrismaExampleRepository } from './infra/database/prisma/example.repository';
import { ExampleController } from './infra/rest/example.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ExampleController],
  providers: [
    CreateExampleUseCase,
    GetAllExampleUseCase,
    {
      provide: IExampleRepository,
      useClass: PrismaExampleRepository,
    },
  ],
})
export class ExampleModule {}
