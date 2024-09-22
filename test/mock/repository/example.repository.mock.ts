import { Example } from '@/modules/example/domain/entity/example.entity';
import { IExampleRepository } from '@/modules/example/domain/repository/example.repository';

export const exampleRepositoryMock: IExampleRepository = {
  findAll: jest.fn().mockResolvedValue([Example.create({ name: 'Example 1' }), Example.create({ name: 'Example 2' })]),
  save: jest.fn(),
};
