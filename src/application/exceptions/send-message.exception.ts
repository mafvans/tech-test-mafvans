export class SendMessageException extends Error {
  constructor(message: string, public name: string) {
    super(message);
  }
}
