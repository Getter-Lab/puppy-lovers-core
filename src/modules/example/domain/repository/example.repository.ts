import { Example } from '../entity/example.entity';

export abstract class IExampleRepository {
  abstract save(example: Example): Promise<void>;
  abstract findAll(): Promise<Example[]>;
}
