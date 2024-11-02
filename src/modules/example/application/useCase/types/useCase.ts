export abstract class UseCase<I extends object | unknown, O> {
  abstract execute(input?: I): Promise<O>;
}
