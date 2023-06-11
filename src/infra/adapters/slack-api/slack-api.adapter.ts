import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  AttachFileSlackException,
  GetMessageSlackException,
  SendMessageSlackException,
} from '@domain/exceptions';
import { FileMessage, IntegrationMessage } from '@domain/models';
import { SlackApiPort } from '@application/ports/slack-api.port';
import {
  PROVIDERS,
  HTTP_TIMEOUT,
  SLACK_API_URL,
  SLACK_API_TOKEN,
} from '@domain/common/constants/envs';
import {
  SendSlackMessageByChannelType,
  GetSlackConversationHistoryType,
} from '@infra/controllers/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FormData from 'form-data';

@Injectable()
export class SlackApiAdapter implements SlackApiPort {
  async getMessage(
    integrationMessage: IntegrationMessage,
  ): Promise<IntegrationMessage[]> {
    const { settings } = integrationMessage;
    try {
      const response = await axios.post<GetSlackConversationHistoryType>(
        `${SLACK_API_URL}/conversations.history?channel=${settings.channel}`,
        { id: integrationMessage.id },
        {
          timeout: HTTP_TIMEOUT,
          headers: {
            Authorization: `Bearer ${SLACK_API_TOKEN}`,
          },
        },
      );
      if (!response.data.ok) {
        throw new GetMessageSlackException(response.data.error);
      }
      return response.data.messages.map(
        (message) =>
          new IntegrationMessage({
            settings,
            id: message.ts,
            user: message.user,
            message: message.text,
            provider: PROVIDERS.SLACK,
            attachments: message.files,
          }),
      );
    } catch (e) {
      throw new GetMessageSlackException(
        e.response?.data?.message ?? e.message,
      );
    }
  }

  async sendMessage(integrationMessage: IntegrationMessage): Promise<void> {
    try {
      const response = await axios.post<SendSlackMessageByChannelType>(
        `${SLACK_API_URL}/chat.postMessage`,
        {
          text: integrationMessage.message,
          channel: integrationMessage.settings.channel,
        },
        {
          timeout: HTTP_TIMEOUT,
          headers: {
            Authorization: `Bearer ${SLACK_API_TOKEN}`,
          },
        },
      );
      if (!response.data.ok) {
        throw new SendMessageSlackException(response.data.error);
      }
    } catch (e) {
      throw new SendMessageSlackException(
        e.response?.data?.message ?? e.message,
      );
    }
  }

  async attachFile(
    fileMessage: FileMessage,
    integrationMessage: IntegrationMessage,
  ): Promise<void> {
    const formData = new FormData();
    formData.append('file', fileMessage.content, {
      filename: fileMessage.filename,
      contentType: fileMessage.contentType,
    });
    formData.append('channels', integrationMessage.settings.channel);
    formData.append('token', SLACK_API_TOKEN);
    try {
      const response = await axios.post<SendSlackMessageByChannelType>(
        `${SLACK_API_URL}/files.upload`,
        formData,
        {
          timeout: HTTP_TIMEOUT,
          headers: {
            Authorization: `Bearer ${SLACK_API_TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (!response.data.ok) {
        throw new AttachFileSlackException(response.data.error);
      }
    } catch (e) {
      throw new AttachFileSlackException(
        e.response?.data?.message ?? e.message,
      );
    }
  }
}
