import { Injectable } from '@nestjs/common';
import { FileMessage, IntegrationMessage } from '@domain/models';
import { MessageRepositoryPort, SlackApiPort } from '@application/ports';

@Injectable()
export class PersistenceSlackApiDecorator implements SlackApiPort {
  constructor(
    private readonly slackApiPort: SlackApiPort,
    private readonly messageRepositoryPort: MessageRepositoryPort,
  ) {}

  async getMessage(
    integrationMessage: IntegrationMessage,
  ): Promise<IntegrationMessage[]> {
    return await this.slackApiPort.getMessage(integrationMessage);
  }

  async attachFile(
    fileMessage: FileMessage,
    integrationMessage: IntegrationMessage,
  ): Promise<void> {
    await this.slackApiPort.attachFile(fileMessage, integrationMessage);
  }

  async sendMessage(integrationMessage: IntegrationMessage): Promise<void> {
    await this.slackApiPort.sendMessage(integrationMessage);
    return this.messageRepositoryPort.add(integrationMessage);
  }
}
