/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IntegrationMessage } from '@domain/models';

export abstract class MessageRepositoryPort {
  abstract add(integrationMessage: IntegrationMessage): Promise<void>;
}
