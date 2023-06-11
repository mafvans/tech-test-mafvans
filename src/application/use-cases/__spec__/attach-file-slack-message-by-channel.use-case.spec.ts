import {
  AttachFileSlackException,
} from '@domain/exceptions';
import {
  AttachFileException,
} from '@application/exceptions';
import { slackApiPortMock } from '@application/__spec__/mocks/ports.mock';
import { AttachFileSlackMessageByChannelUseCase } from '@application/use-cases';
import {
  fileMessageFixture,
  integrationMessageFixture,
} from '@domain/__spec__/fixtures/models.fixture';

describe('USE-CASE | attach-file-slack-message-history-by-channel', () => {
  let attachFileSlackMessageByChannelUseCase: AttachFileSlackMessageByChannelUseCase;

  beforeEach(() => {
    attachFileSlackMessageByChannelUseCase =
      new AttachFileSlackMessageByChannelUseCase(slackApiPortMock);
    jest.restoreAllMocks();
  });
  describe('SUCCESS FLOWS', () => {
    it('Should be attach file to slack channel', async () => {
      const spy = jest
        .spyOn(slackApiPortMock, 'attachFile')
        .mockResolvedValue(null);
      const rs = await attachFileSlackMessageByChannelUseCase.execute(
        fileMessageFixture(),
        integrationMessageFixture(),
      );
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('FAILED FLOWS', () => {
    it('Should throw error for adapter fail and return bubbling exception message', async () => {
      jest
        .spyOn(slackApiPortMock, 'attachFile')
        .mockRejectedValue(new AttachFileSlackException('plop!'));
      try {
        await attachFileSlackMessageByChannelUseCase.execute(
          fileMessageFixture(),
          integrationMessageFixture(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AttachFileException);
        expect(error.message).toEqual(
          'AttachFileSlackMessageByChannelUseCase - Error attaching file with slack api  - plop!',
        );
      }
    });
  });
});
