import { Express } from 'express';
import {
  Get,
  Post,
  Body,
  Query,
  Param,
  Inject,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  UseCaseProxy,
  IntegrationUsesCasesProxyModule,
} from '@infra/usecases-proxy';
import { FileMessage, IntegrationMessage } from '@domain/models';
import {
  GetSlackMessagesDto,
  SendSlackMessagesDto,
} from '@infra/controllers/dtos';
import { CONTROLLERS } from '@infra/commons/constants/config';
import { IntegrationMessageMapper } from '@infra/controllers/mappers';
import {
  SendSlackMessageByChannelsUseCase,
  GetSlackMessageHistoryByChannelUseCase,
  AttachFileSlackMessageByChannelUseCase,
} from '@application/use-cases';
import { FileInterceptor } from '@nestjs/platform-express';

const { INTEGRATION } = CONTROLLERS;
@Controller(INTEGRATION.NAME)
export class IntegrationController {
  constructor(
    @Inject(
      IntegrationUsesCasesProxyModule.GET_SLACK_MESSAGE_HISTORY_BY_CHANNEL,
    )
    private readonly getSlackMessageHistoryByChannelUseCase: UseCaseProxy<GetSlackMessageHistoryByChannelUseCase>,
    @Inject(IntegrationUsesCasesProxyModule.SEND_SLACK_MESSAGE_BY_CHANNELS)
    private readonly sendSlackMessageByChannelsUseCase: UseCaseProxy<SendSlackMessageByChannelsUseCase>,
    @Inject(
      IntegrationUsesCasesProxyModule.ATTACH_FILE_SLACK_MESSAGE_BY_CHANNEL,
    )
    private readonly attachFileSlackMessageByChannelUseCase: UseCaseProxy<AttachFileSlackMessageByChannelUseCase>,
  ) {}

  @Get(INTEGRATION.SLACK.MESSAGES)
  async getSlackMessageHistoryByChannel(
    @Query() input: GetSlackMessagesDto,
  ): Promise<IntegrationMessage[]> {
    return await this.getSlackMessageHistoryByChannelUseCase
      .getInstance()
      .execute(
        new IntegrationMessage({ settings: { channel: input.channel } }),
      );
  }

  @Post(INTEGRATION.SLACK.MESSAGES)
  async sendSlackMessageToChannel(
    @Body() input: SendSlackMessagesDto,
  ): Promise<{ message: string }> {
    const integrationMessageArray =
      IntegrationMessageMapper.generateArray(input);
    return await this.sendSlackMessageByChannelsUseCase
      .getInstance()
      .execute(integrationMessageArray);
  }

  @Post(INTEGRATION.SLACK.MESSAGE_ATTACH)
  @UseInterceptors(FileInterceptor('file'))
  async attachFileToSlackChannel(
    @UploadedFile() file: Express.Multer.File,
    @Param('channel') channel: string,
  ): Promise<{ message: string }> {
    return await this.attachFileSlackMessageByChannelUseCase
      .getInstance()
      .execute(
        new FileMessage({
          content: file.buffer,
          filename: file.originalname,
          contentType: file.mimetype,
        }),
        new IntegrationMessage({ settings: { channel } }),
      );
  }
}
