import { randomUUID } from 'node:crypto';

export class BaseEntity {
  protected readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
    this.validate();
  }

  private validate(): void {
    const regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
    if (!regex.test(this._id)) {
      throw new Error('Invalid id format');
    }
  }
}
