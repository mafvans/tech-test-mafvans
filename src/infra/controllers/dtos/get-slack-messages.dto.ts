import { IsString } from 'class-validator';

export class GetSlackMessagesDto {
  @IsString()
  channel: string;
}
