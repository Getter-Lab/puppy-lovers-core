import { Example } from '../entity/example.entity';

export interface IExampleRepository {
  save(example: Example): Promise<void>;
  findAll(): Promise<Example[]>;
}
