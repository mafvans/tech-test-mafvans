import { SendMessageSlackException } from '@domain/exceptions';
import { SendMessageException } from '@application/exceptions';
import { SendSlackMessageByChannelsUseCase } from '@application/use-cases';
import { integrationMessageFixture } from '@domain/__spec__/fixtures/models.fixture';
import {
  cacheClientPortMock,
  slackApiPortMock,
} from '@application/__spec__/mocks/ports.mock';

describe('USE-CASE | send-slack-message-by-channels', () => {
  let sendSlackMessageByChannelsUseCase: SendSlackMessageByChannelsUseCase;

  beforeEach(() => {
    sendSlackMessageByChannelsUseCase = new SendSlackMessageByChannelsUseCase(
      slackApiPortMock,
      cacheClientPortMock,
    );
    jest.restoreAllMocks();
  });
  describe('SUCCESS FLOWS', () => {
    it('Should be send a slack message by channels', async () => {
      const spy = jest
        .spyOn(slackApiPortMock, 'sendMessage')
        .mockResolvedValue();
      jest.spyOn(cacheClientPortMock, 'get').mockResolvedValue(undefined);
      await sendSlackMessageByChannelsUseCase.execute([
        integrationMessageFixture(),
        integrationMessageFixture(),
      ]);
      expect(spy).toBeCalledWith(integrationMessageFixture());
      expect(spy).toBeCalledTimes(2);
    });
    it('Should be skip message by cache register', async () => {
      const spy = jest
        .spyOn(slackApiPortMock, 'sendMessage')
        .mockResolvedValue();
      jest.spyOn(cacheClientPortMock, 'get').mockResolvedValue('exist!');
      await sendSlackMessageByChannelsUseCase.execute([
        integrationMessageFixture(),
      ]);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('FAILED FLOWS', () => {
    it('Should throw error for adapter fail and return bubbling exception message', async () => {
      jest
        .spyOn(slackApiPortMock, 'sendMessage')
        .mockRejectedValue(new SendMessageSlackException('plop!'));
      try {
        await sendSlackMessageByChannelsUseCase.execute([
          integrationMessageFixture(),
        ]);
      } catch (error) {
        expect(error).toBeInstanceOf(SendMessageException);
        expect(error.message).toEqual(
          'SendSlackMessageByChannelsUseCase - Error sending message with slack api  - plop!',
        );
      }
    });
  });
});
