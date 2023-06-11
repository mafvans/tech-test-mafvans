export class IntegrationMessageSettings {
  channel?: string;
  constructor(input: { channel?: string }) {
    this.channel = input.channel;
  }
}
