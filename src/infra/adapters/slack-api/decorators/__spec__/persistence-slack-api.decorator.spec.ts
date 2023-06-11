import { PersistenceSlackApiDecorator } from '@infra/adapters/slack-api/decorators';
import {
  messageRepositoryPort,
  slackApiPortMock,
} from '@application/__spec__/mocks/ports.mock';
import {
  fileMessageFixture,
  integrationMessageFixture,
} from '@domain/__spec__/fixtures/models.fixture';

describe('DECORATOR | persistence-slack-api.decorator', () => {
  let decorator: PersistenceSlackApiDecorator;
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    decorator = new PersistenceSlackApiDecorator(
      slackApiPortMock,
      messageRepositoryPort,
    );
  });

  it('Should be call sendMessage method and must record the sent message', async () => {
    const spySlack = jest
      .spyOn(slackApiPortMock, 'sendMessage')
      .mockResolvedValue(null);
    const spyDb = jest
      .spyOn(messageRepositoryPort, 'add')
      .mockReturnValue(null);
    await decorator.sendMessage(integrationMessageFixture());
    expect(spySlack).toBeCalled();
    expect(spyDb).toBeCalled();
  });

  it('Should be call getMessage', async () => {
    const spySlack = jest
      .spyOn(slackApiPortMock, 'getMessage')
      .mockResolvedValue(null);
    await decorator.getMessage(integrationMessageFixture());
    expect(spySlack).toBeCalled();
  });

  it('Should be call attachFile', async () => {
    const spySlack = jest
      .spyOn(slackApiPortMock, 'attachFile')
      .mockResolvedValue(null);
    await decorator.attachFile(
      fileMessageFixture(),
      integrationMessageFixture(),
    );
    expect(spySlack).toBeCalled();
  });
});
