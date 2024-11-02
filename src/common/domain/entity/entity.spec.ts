import { BaseEntity } from './entity';

describe('[Unit] Base entity', () => {
  it('should validate base entity uuid v4', () => {
    const fakeId = 'any-invalid-uuid';
    expect(() => new BaseEntity(fakeId)).toThrow('Invalid id format');
  });
});
