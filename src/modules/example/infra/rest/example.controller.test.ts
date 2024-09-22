import { Test, TestingModule } from '@nestjs/testing';
import { CreateExampleUseCase } from '../../application/useCase/example/create.usecase';
import { GetAllExampleUseCase } from '../../application/useCase/example/get-all.usecase';
import { Example } from '../../domain/entity/example.entity';
import { IExampleRepository } from '../../domain/repository/example.repository';
import { InMemoryExampleRepository } from '../database/inMemory/example.repository';
import { ExampleController } from './example.controller';

describe('[Integration] - ExampleController', () => {
  let controller: ExampleController;
  let createExampleUseCase: CreateExampleUseCase;
  let getAllExampleUseCase: GetAllExampleUseCase;
  let exampleRepository: IExampleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [CreateExampleUseCase, GetAllExampleUseCase, InMemoryExampleRepository],
    }).compile();

    createExampleUseCase = module.get<CreateExampleUseCase>(CreateExampleUseCase);
    getAllExampleUseCase = module.get<GetAllExampleUseCase>(GetAllExampleUseCase);
    exampleRepository = module.get<InMemoryExampleRepository>(InMemoryExampleRepository);
    controller = module.get<ExampleController>(ExampleController);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should get all examples correctly', async () => {
    const fakeExamples = [Example.create({ name: 'Example 1' })];
    jest.spyOn(exampleRepository, 'findAll').mockResolvedValue(fakeExamples);
    const getAllUcSpy = jest.spyOn(getAllExampleUseCase, 'execute');

    const response = await controller.findAll();

    expect(response).toEqual(fakeExamples.map((example) => example.toJson()));
    expect(getAllUcSpy).toHaveBeenCalled();
  });

  it('should create example', async () => {
    const saveExampleSpy = jest.spyOn(exampleRepository, 'save').mockResolvedValue();
    const inputDto = { name: 'Example' };
    const createUcSpy = jest.spyOn(createExampleUseCase, 'execute');

    const response = await controller.create(inputDto);

    expect(response).toBeUndefined();
    expect(createUcSpy).toHaveBeenCalledWith(inputDto);
    expect(saveExampleSpy).toHaveBeenCalledWith(inputDto);
  });
});
