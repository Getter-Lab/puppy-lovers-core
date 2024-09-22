import { randomUUID } from 'crypto';
import { Example } from './example.entity';

describe('[Entity] Example', () => {
  it('should create a new example without id', () => {
    const fakeProps = {
      name: 'Example Name',
    };
    const example = Example.create(fakeProps);
    expect(example).toBeInstanceOf(Example);
    expect(example.toJson()).toStrictEqual({
      ...fakeProps,
      id: expect.any(String),
    });
  });

  it('should create a new example with provided id', () => {
    const fakeProps = {
      id: randomUUID(),
      name: 'Example Name',
    };
    const example = Example.create(fakeProps);
    expect(example).toBeInstanceOf(Example);
    expect(example.toJson()).toStrictEqual(fakeProps);
  });
});
