import { IntegrationMessageSettings } from '@domain/models';

export class IntegrationMessage {
  id?: string;
  user?: string;
  message?: string;
  provider?: string;
  referenceId?: string;
  attachments?: object[];
  settings?: IntegrationMessageSettings;

  constructor(input: {
    id?: string;
    user?: string;
    message?: string;
    provider?: string;
    referenceId?: string;
    attachments?: object[];
    settings?: IntegrationMessageSettings;
  }) {
    this.id = input.id;
    this.user = input.user;
    this.message = input.message;
    this.provider = input.provider;
    this.settings = input.settings;
    this.referenceId = input.referenceId;
    this.attachments = input.attachments;
  }
}
