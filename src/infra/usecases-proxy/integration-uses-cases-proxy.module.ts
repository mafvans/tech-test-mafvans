import { CacheClientPort, MessageRepositoryPort } from '@application/ports';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '@infra/usecases-proxy/use-cases-proxy';
import { SlackApiModule } from '@infra/adapters/slack-api/slack-api.module';
import { SlackApiAdapter } from '@infra/adapters/slack-api/slack-api.adapter';
import {
  SendSlackMessageByChannelsUseCase,
  GetSlackMessageHistoryByChannelUseCase,
} from '@application/use-cases';
import { MessageModule } from '@infra/persistence/mongoose/message.module';
import { PersistenceSlackApiDecorator } from '@infra/adapters/slack-api/decorators';
import { NestCacheClientModule } from '@infra/adapters/nest-cache-client/nest-cache-client.module';
import { AttachFileSlackMessageByChannelUseCase } from '@application/use-cases/attach-file-slack-message-by-channel';

@Module({
  imports: [SlackApiModule, NestCacheClientModule, MessageModule],
})
export class IntegrationUsesCasesProxyModule {
  static GET_SLACK_MESSAGE_HISTORY_BY_CHANNEL =
    'GetSlackMessageHistoryByChannel';
  static SEND_SLACK_MESSAGE_BY_CHANNELS = 'SendSlackMessageByChannels';
  static ATTACH_FILE_SLACK_MESSAGE_BY_CHANNEL =
    'AttachFileSlackMessageByChannel';

  static register(): DynamicModule {
    return {
      module: IntegrationUsesCasesProxyModule,
      providers: [
        {
          provide:
            IntegrationUsesCasesProxyModule.GET_SLACK_MESSAGE_HISTORY_BY_CHANNEL,
          inject: [SlackApiAdapter],
          useFactory: (
            slackApiAdapter: SlackApiAdapter,
          ): UseCaseProxy<GetSlackMessageHistoryByChannelUseCase> =>
            new UseCaseProxy(
              new GetSlackMessageHistoryByChannelUseCase(slackApiAdapter),
            ),
        },
        {
          provide:
            IntegrationUsesCasesProxyModule.SEND_SLACK_MESSAGE_BY_CHANNELS,
          inject: [SlackApiAdapter, CacheClientPort, MessageRepositoryPort],
          useFactory: (
            slackApiAdapter: SlackApiAdapter,
            cacheClient: CacheClientPort,
            messageRepository: MessageRepositoryPort,
          ): UseCaseProxy<SendSlackMessageByChannelsUseCase> =>
            new UseCaseProxy(
              new SendSlackMessageByChannelsUseCase(
                new PersistenceSlackApiDecorator(
                  slackApiAdapter,
                  messageRepository,
                ),
                cacheClient,
              ),
            ),
        },
        {
          provide:
            IntegrationUsesCasesProxyModule.ATTACH_FILE_SLACK_MESSAGE_BY_CHANNEL,
          inject: [SlackApiAdapter],
          useFactory: (
            slackApiAdapter: SlackApiAdapter,
          ): UseCaseProxy<AttachFileSlackMessageByChannelUseCase> =>
            new UseCaseProxy(
              new AttachFileSlackMessageByChannelUseCase(slackApiAdapter),
            ),
        },
      ],
      exports: [
        IntegrationUsesCasesProxyModule.SEND_SLACK_MESSAGE_BY_CHANNELS,
        IntegrationUsesCasesProxyModule.ATTACH_FILE_SLACK_MESSAGE_BY_CHANNEL,
        IntegrationUsesCasesProxyModule.GET_SLACK_MESSAGE_HISTORY_BY_CHANNEL,
      ],
    };
  }
}
