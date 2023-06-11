import { IntegrationMessage } from '@domain/models';
import { SlackApiPort } from '@application/ports';
import { GetMessageException } from '@application/exceptions';
import { getMessageByException } from '@application/exceptions/utils';

export class GetSlackMessageHistoryByChannelUseCase {
  useCaseName: string;

  constructor(private slackApi: SlackApiPort) {
    this.useCaseName = GetSlackMessageHistoryByChannelUseCase.name;
  }
  async execute(payload: IntegrationMessage): Promise<IntegrationMessage[]> {
    try {
      return await this.slackApi.getMessage(payload);
    } catch (e) {
      throw new GetMessageException(
        getMessageByException(e, this.useCaseName),
        e.constructor.name,
      );
    }
  }
}
