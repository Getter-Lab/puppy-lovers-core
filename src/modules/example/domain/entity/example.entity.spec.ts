import { Example } from './example.entity';

describe('[Entity] Example', () => {
  it('should create a new example correctly', () => {
    const fakeProps = {
      name: 'Example Name',
    };
    const example = Example.create(fakeProps);
    expect(example).toBeInstanceOf(Example);
    expect(example.toJson()).toStrictEqual(fakeProps);
  });
});
