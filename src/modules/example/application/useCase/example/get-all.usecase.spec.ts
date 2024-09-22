import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';
import { InMemoryExampleRepository } from '@/modules/example/infra/database/inMemory/example.repository';
import { GetAllExampleUseCase } from './get-all.usecase';

describe('[UseCase] Get all example', () => {
  let useCase: GetAllExampleUseCase;
  let exampleRepository: IExampleRepository;

  beforeEach(() => {
    exampleRepository = new InMemoryExampleRepository();
    useCase = new GetAllExampleUseCase(exampleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create example correctly', async () => {
    const expectedExample = Array.from({ length: 3 }, (_, index) => Example.create({ name: `Example ${index}` }));
    const findAllExampleSpy = jest.spyOn(exampleRepository, 'findAll').mockResolvedValue(expectedExample);
    const output = await useCase.execute();
    expect(output).toStrictEqual(
      expectedExample.map((example) => ({
        name: example.toJson().name,
      })),
    );
    expect(findAllExampleSpy).toHaveBeenCalled();
  });
});
