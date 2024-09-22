export type ExampleProps = {
  name: string;
};

export class Example {
  private name: string;

  constructor(props: ExampleProps) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  static create(props: ExampleProps): Example {
    return new Example(props);
  }

  toJson(): ExampleProps {
    return {
      name: this.name,
    };
  }
}
