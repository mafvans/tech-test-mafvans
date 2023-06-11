import { SlackApiPort } from '@application/ports';
import { AttachFileException } from '@application/exceptions';
import { FileMessage, IntegrationMessage } from '@domain/models';
import { getMessageByException } from '@application/exceptions/utils';

export class AttachFileSlackMessageByChannelUseCase {
  useCaseName: string;

  constructor(private slackApi: SlackApiPort) {
    this.useCaseName = AttachFileSlackMessageByChannelUseCase.name;
  }
  async execute(
    fileMessage: FileMessage,
    integrationMessage: IntegrationMessage,
  ): Promise<{ message: string }> {
    const okResponse = { message: 'Success!' };
    try {
      await this.slackApi.attachFile(fileMessage, integrationMessage);
      return okResponse;
    } catch (e) {
      throw new AttachFileException(
        getMessageByException(e, this.useCaseName),
        e.constructor.name,
      );
    }
  }
}
