import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IntegrationMessage } from '@domain/models';
import { MessageRepositoryPort } from '@application/ports';
import { AddDocumentToDatabaseException } from '@domain/exceptions';
import { MessageInterface } from '@infra/persistence/mongoose/interfaces';

@Injectable()
export class MessageRepository implements MessageRepositoryPort {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<MessageInterface>,
  ) {}
  async add(integrationMessage: IntegrationMessage): Promise<void> {
    try {
      const existingMessage = await this.messageModel.findOne({
        id: integrationMessage.referenceId,
      });

      if (existingMessage) {
        return;
      }
      const newMessage = await new this.messageModel({
        id: integrationMessage.referenceId,
        data: integrationMessage,
      });
      await newMessage.save();
    } catch (e) {
      throw new AddDocumentToDatabaseException(
        e.response?.data?.message ?? e.message,
      );
    }
  }
}
