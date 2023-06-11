import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class SendSlackMessagesDto {
  @IsArray()
  @ArrayNotEmpty()
  channels: string[];
  @IsString()
  message: string;
  @IsString()
  referenceId: string;
}
