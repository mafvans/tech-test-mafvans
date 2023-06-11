import { GetMessageSlackException } from '@domain/exceptions';
import { GetMessageException } from '@application/exceptions';
import { slackApiPortMock } from '@application/__spec__/mocks/ports.mock';
import { GetSlackMessageHistoryByChannelUseCase } from '@application/use-cases';
import { integrationMessageFixture } from '@domain/__spec__/fixtures/models.fixture';

describe('USE-CASE | get-slack-message-history-by-channel', () => {
  let getSlackMessageHistoryByChannelUseCase: GetSlackMessageHistoryByChannelUseCase;

  beforeEach(() => {
    getSlackMessageHistoryByChannelUseCase =
      new GetSlackMessageHistoryByChannelUseCase(slackApiPortMock);
    jest.restoreAllMocks();
  });
  describe('SUCCESS FLOWS', () => {
    it('Should be return a slack message history', async () => {
      jest
        .spyOn(slackApiPortMock, 'getMessage')
        .mockResolvedValue([integrationMessageFixture()]);
      const rs = await getSlackMessageHistoryByChannelUseCase.execute(
        integrationMessageFixture(),
      );
      expect(rs).toMatchObject([
        {
          id: '1512085950.000216',
          user: 'ASDC',
          message: 'Hi Hunty',
          provider: 'Slack',
          referenceId: '935fc762-0746-11ee-be56-0242ac120002',
        },
      ]);
    });
  });
  describe('FAILED FLOWS', () => {
    it('Should throw error for adapter fail and return bubbling exception message', async () => {
      jest
        .spyOn(slackApiPortMock, 'getMessage')
        .mockRejectedValue(new GetMessageSlackException('plop!'));
      try {
        await getSlackMessageHistoryByChannelUseCase.execute(
          integrationMessageFixture(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(GetMessageException);
        expect(error.message).toEqual(
          'GetSlackMessageHistoryByChannelUseCase - Error getting messages with slack api  - plop!',
        );
      }
    });
  });
});
