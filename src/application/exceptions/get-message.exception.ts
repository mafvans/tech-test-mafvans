export class GetMessageException extends Error {
  constructor(message: string, public name: string) {
    super(message);
  }
}
