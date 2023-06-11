import { IntegrationMessage } from '@domain/models';
import { SendMessageException } from '@application/exceptions';
import { CacheClientPort, SlackApiPort } from '@application/ports';
import { getMessageByException } from '@application/exceptions/utils';

export class SendSlackMessageByChannelsUseCase {
  useCaseName: string;

  constructor(
    private slackApi: SlackApiPort,
    private cacheClient: CacheClientPort,
  ) {
    this.useCaseName = SendSlackMessageByChannelsUseCase.name;
  }
  async execute(input: IntegrationMessage[]): Promise<{ message: string }> {
    const okResponse = { message: 'Success!' };
    try {
      const exist = await this.cacheClient.get<string>(input[0].referenceId);
      if (exist) {
        return okResponse;
      }
      const sendMessagePromises = input.map((integrationMessage) =>
        this.slackApi.sendMessage(integrationMessage),
      );
      await Promise.all(sendMessagePromises);
      await this.cacheClient.set(input[0].referenceId, 'exist!');
      return okResponse;
    } catch (e) {
      throw new SendMessageException(
        getMessageByException(e, this.useCaseName),
        e.constructor.name,
      );
    }
  }
}
