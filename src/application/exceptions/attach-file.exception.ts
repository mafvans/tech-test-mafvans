export class AttachFileException extends Error {
  constructor(message: string, public name: string) {
    super(message);
  }
}
