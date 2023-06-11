import { IntegrationMessage } from '@domain/models';
import { SendSlackMessagesDto } from '@infra/controllers/dtos';

export class IntegrationMessageMapper {
  static generateArray(dto: SendSlackMessagesDto): IntegrationMessage[] {
    const { referenceId, message } = dto;
    return dto.channels.map(
      (channel) =>
        new IntegrationMessage({
          referenceId,
          message,
          settings: {
            channel,
          },
        }),
    );
  }
}
