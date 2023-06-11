import { Module } from '@nestjs/common';
import { SlackApiAdapter } from '@infra/adapters/slack-api/slack-api.adapter';

@Module({
  providers: [SlackApiAdapter],
  exports: [SlackApiAdapter],
})
export class SlackApiModule {}
