/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileMessage, IntegrationMessage } from '@domain/models';

export abstract class SlackApiPort {
  abstract getMessage(
    integrationMessage: IntegrationMessage,
  ): Promise<IntegrationMessage[]>;
  abstract sendMessage(integrationMessage: IntegrationMessage): Promise<void>;
  abstract attachFile(
    fileMessage: FileMessage,
    integrationMessage: IntegrationMessage,
  ): Promise<void>;
}
