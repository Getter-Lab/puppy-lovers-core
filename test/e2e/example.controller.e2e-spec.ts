import { exampleRepositoryMock, fakeExampleList } from '#/mock/repository/example.repository.mock';
import { CreateExampleUseCase } from '@/modules/example/application/useCase/example/create.usecase';
import { GetAllExampleUseCase } from '@/modules/example/application/useCase/example/get-all.usecase';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { ExampleController } from '@/modules/example/infra/rest/example.controller';
import { ExampleRoutes } from '@/modules/example/infra/rest/routes/example.enum';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

describe('[E2E] - ExampleController', () => {
  let app: INestApplication;
  let createExampleUseCase: CreateExampleUseCase;
  let getAllExampleUseCase: GetAllExampleUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        CreateExampleUseCase,
        GetAllExampleUseCase,
        {
          provide: IExampleRepository,
          useValue: exampleRepositoryMock,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    createExampleUseCase = app.get<CreateExampleUseCase>(CreateExampleUseCase);
    getAllExampleUseCase = app.get<GetAllExampleUseCase>(GetAllExampleUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /examples', async () => {
    const expectBodyResponse = fakeExampleList.map((example) => example.toJson());
    const getAllUcSpy = jest.spyOn(getAllExampleUseCase, 'execute');
    await supertest(app.getHttpServer()).get(ExampleRoutes.root).expect(HttpStatus.OK).expect(expectBodyResponse);
    expect(getAllUcSpy).toHaveBeenCalled();
  });

  it('POST /examples', async () => {
    const inputDto = { name: 'Example' };
    const createUcSpy = jest.spyOn(createExampleUseCase, 'execute');
    await supertest(app.getHttpServer()).post(ExampleRoutes.root).send(inputDto).expect(HttpStatus.CREATED);
    expect(createUcSpy).toHaveBeenCalledWith(inputDto);
  });
});
