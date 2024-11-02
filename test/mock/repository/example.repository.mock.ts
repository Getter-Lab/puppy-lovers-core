import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';

export const fakeExampleList = [Example.create({ name: 'Example 1' }), Example.create({ name: 'Example 2' })];

export const exampleRepositoryMock: IExampleRepository = {
  findAll: jest.fn().mockResolvedValue(fakeExampleList),
  save: jest.fn(),
};
