import { exampleRepositoryMock } from '#/mock/repository/example.repository.mock';
import { CreateExampleUseCase } from '../../application/useCase/example/create.usecase';
import { GetAllExampleUseCase } from '../../application/useCase/example/get-all.usecase';
import { IExampleRepository } from '../../domain/repository/example.repository';
import { ExampleController } from './example.controller';

describe('[Integration] - ExampleController', () => {
  let controller: ExampleController;
  let createExampleUseCase: CreateExampleUseCase;
  let getAllExampleUseCase: GetAllExampleUseCase;
  let exampleRepository: IExampleRepository;

  beforeEach(async () => {
    exampleRepository = exampleRepositoryMock;
    createExampleUseCase = new CreateExampleUseCase(exampleRepository);
    getAllExampleUseCase = new GetAllExampleUseCase(exampleRepository);
    controller = new ExampleController(createExampleUseCase, getAllExampleUseCase);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should get all examples correctly', async () => {
    const getAllUcSpy = jest.spyOn(getAllExampleUseCase, 'execute');
    const expectedOutput = (await exampleRepositoryMock.findAll()).map((example) => example.toJson());

    const response = await controller.findAll();

    expect(response).toStrictEqual(expectedOutput);
    expect(getAllUcSpy).toHaveBeenCalled();
  });

  it('should create example', async () => {
    const createUcSpy = jest.spyOn(createExampleUseCase, 'execute');
    const inputDto = { name: 'Example' };

    const response = await controller.create(inputDto);

    expect(response).toBeUndefined();
    expect(createUcSpy).toHaveBeenCalledWith(inputDto);
  });
});
