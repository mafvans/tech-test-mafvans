import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageRepositoryPort } from '@application/ports';
import { MessageRepository } from '@infra/persistence/mongoose/repositories';
import { messageSchema as MessageSchema } from '@infra/persistence/mongoose/schemas';

const messageProvider = {
  provide: MessageRepositoryPort,
  useClass: MessageRepository,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [messageProvider],
  exports: [messageProvider],
})
export class MessageModule {}
