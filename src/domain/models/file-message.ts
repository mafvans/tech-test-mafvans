export class FileMessage {
  content?: Buffer;
  filename?: string;
  contentType?: string;

  constructor(input: {
    content?: Buffer;
    filename?: string;
    contentType?: string;
  }) {
    this.content = input.content;
    this.filename = input.filename;
    this.contentType = input.contentType;
  }
}
