import { FileMessage, IntegrationMessage } from '@domain/models';

export const integrationMessageFixture = (
  args?: Partial<IntegrationMessage>,
): IntegrationMessage =>
  new IntegrationMessage({
    id: '1512085950.000216',
    referenceId: '935fc762-0746-11ee-be56-0242ac120002',
    message: 'Hi Hunty',
    user: 'ASDC',
    provider: 'Slack',
    ...args,
  });
export const fileMessageFixture = (args?: Partial<FileMessage>): FileMessage =>
  new FileMessage({
    content: new Buffer(''),
    filename: 'fileName',
    contentType: 'type',
    ...args,
  });
