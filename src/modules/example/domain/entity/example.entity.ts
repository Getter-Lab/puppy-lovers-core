import { BaseEntity } from '@/common/domain/entity/entity';

export type ExampleProps = {
  id?: string;
  name: string;
};

export type ExampleJson = ExampleProps & {
  id: string;
};

export class Example extends BaseEntity {
  private readonly name: string;

  constructor(props: ExampleProps) {
    super(props.id);
    this.name = props.name;
    this._validate();
  }

  private _validate() {
    // entity validation
  }

  static create(props: ExampleProps): Example {
    return new Example(props);
  }

  toJson(): ExampleJson {
    return {
      id: this._id,
      name: this.name,
    };
  }
}
