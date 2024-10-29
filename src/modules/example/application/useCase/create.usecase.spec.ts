import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { InMemoryExampleRepository } from '@/modules/example/infra/database/inMemory/example.repository';
import { CreateExampleUseCase } from './create.usecase';

describe('[UseCase] Create example', () => {
  let useCase: CreateExampleUseCase;
  let exampleRepository: IExampleRepository;

  beforeEach(() => {
    exampleRepository = new InMemoryExampleRepository();
    useCase = new CreateExampleUseCase(exampleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create example correctly', async () => {
    const input = {
      name: 'example name',
    };
    const saveExampleSpy = jest.spyOn(exampleRepository, 'save');
    const output = await useCase.execute(input);
    expect(output).toBeUndefined();
    expect(saveExampleSpy).toHaveBeenCalled();
  });
});
