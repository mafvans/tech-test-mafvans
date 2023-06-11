import axios from 'axios';
import { UseCaseProxy } from '@infra/usecases-proxy';
import { IntegrationController } from '@infra/controllers';
import { SlackApiAdapter } from '@infra/adapters/slack-api';
import { cacheClientPortMock } from '@application/__spec__/mocks/ports.mock';
import {
  SendSlackMessageByChannelsUseCase,
  GetSlackMessageHistoryByChannelUseCase,
  AttachFileSlackMessageByChannelUseCase,
} from '@application/use-cases';

describe('CONTROLLERS | Integration', () => {
  let controller: IntegrationController;
  let sendSlackMessageByChannelsUseCase: UseCaseProxy<SendSlackMessageByChannelsUseCase>;
  let getSlackMessageHistoryByChannelUseCase: UseCaseProxy<GetSlackMessageHistoryByChannelUseCase>;
  let attachFileSlackMessageByChannelUseCase: UseCaseProxy<AttachFileSlackMessageByChannelUseCase>;
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    sendSlackMessageByChannelsUseCase =
      new UseCaseProxy<SendSlackMessageByChannelsUseCase>(
        new SendSlackMessageByChannelsUseCase(
          new SlackApiAdapter(),
          cacheClientPortMock,
        ),
      );
    getSlackMessageHistoryByChannelUseCase =
      new UseCaseProxy<GetSlackMessageHistoryByChannelUseCase>(
        new GetSlackMessageHistoryByChannelUseCase(new SlackApiAdapter()),
      );
    attachFileSlackMessageByChannelUseCase =
      new UseCaseProxy<AttachFileSlackMessageByChannelUseCase>(
        new AttachFileSlackMessageByChannelUseCase(new SlackApiAdapter()),
      );
    controller = new IntegrationController(
      getSlackMessageHistoryByChannelUseCase,
      sendSlackMessageByChannelsUseCase,
      attachFileSlackMessageByChannelUseCase,
    );
  });

  it('Should be return slack message history', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        ok: true,
        messages: [
          {
            type: 'message',
            user: 'U012AB3CDE',
            text: 'I find you punny and would like to smell your nose letter',
            ts: '1512085950.000216',
          },
          {
            type: 'message',
            user: 'U061F7AUR',
            text: "Isn't this whether dreadful? <https://badpuns.example.com/puns/123>",
            files: [
              {
                id: 'F05CMTSRZDE',
                created: 1686444690,
                timestamp: 1686444690,
                name: 'goku.jpeg',
                title: 'goku.jpeg',
                mimetype: 'image/jpeg',
                filetype: 'jpg',
                pretty_type: 'JPEG',
                user: 'U05C0JQTXNG',
                user_team: 'T05BV7UH7FF',
                editable: false,
                size: 4898570,
                mode: 'hosted',
                is_external: false,
                external_type: '',
                is_public: true,
                public_url_shared: false,
                display_as_bot: false,
                username: '',
                url_private:
                  'https://files.slack.com/files-pri/T05BV7UH7FF-F05CMTSRZDE/goku.jpeg',
                url_private_download:
                  'https://files.slack.com/files-pri/T05BV7UH7FF-F05CMTSRZDE/download/goku.jpeg',
                media_display_type: 'unknown',
                thumb_64:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_64.jpg',
                thumb_80:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_80.jpg',
                thumb_360:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_360.jpg',
                thumb_360_w: 360,
                thumb_360_h: 225,
                thumb_480:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_480.jpg',
                thumb_480_w: 480,
                thumb_480_h: 300,
                thumb_160:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_160.jpg',
                thumb_720:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_720.jpg',
                thumb_720_w: 720,
                thumb_720_h: 450,
                thumb_800:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_800.jpg',
                thumb_800_w: 800,
                thumb_800_h: 500,
                thumb_960:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_960.jpg',
                thumb_960_w: 960,
                thumb_960_h: 600,
                thumb_1024:
                  'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_1024.jpg',
                thumb_1024_w: 1024,
                thumb_1024_h: 640,
                original_w: 2880,
                original_h: 1800,
                thumb_tiny:
                  'AwAeADCugyWXHGOPY1OqLHtj2Bmz81QqpZ22qSSMirIGQh6kDHPv2roGIsS87o1xnpjrULxh1DhMADkVZYMX4znB5prHaWZgQCu0e9ICmfnbngCmhiM7cAfSp3UbFATbn8zUbIg/j6dadgsiWKbY4Izz2NXN2IyeOuM4qpbOPun+Lpx0qyG/dYHOCck0mC3AoxOTIu7tQSxjbJDEY6iq7SyCUAOflOM1YDbVct8wA/OpsUyCQllJAy6nqOlVCjDORVq5lWMlADx1xxmoCg2bkJHsaom5/9k=',
                permalink:
                  'https://huntytestmigu-ol64996.slack.com/files/U05C0JQTXNG/F05CMTSRZDE/goku.jpeg',
                permalink_public:
                  'https://slack-files.com/T05BV7UH7FF-F05CMTSRZDE-fe031aef3b',
                is_starred: false,
                has_rich_preview: false,
                file_access: 'visible',
              },
            ],
            ts: '1512085950.218404',
          },
        ],
        has_more: true,
        pin_count: 0,
        response_metadata: {
          next_cursor: 'bmV4dF90czoxNTEyMTU0NDA5MDAwMjU2',
        },
      },
    });
    const rs = await controller.getSlackMessageHistoryByChannel({
      channel: 'AS23AS',
    });
    expect(rs).toMatchObject([
      {
        id: '1512085950.000216',
        user: 'U012AB3CDE',
        message: 'I find you punny and would like to smell your nose letter',
        provider: 'Slack',
        settings: {
          channel: 'AS23AS',
        },
      },
      {
        id: '1512085950.218404',
        user: 'U061F7AUR',
        message:
          "Isn't this whether dreadful? <https://badpuns.example.com/puns/123>",
        provider: 'Slack',
        attachments: [
          {
            id: 'F05CMTSRZDE',
            created: 1686444690,
            timestamp: 1686444690,
            name: 'goku.jpeg',
            title: 'goku.jpeg',
            mimetype: 'image/jpeg',
            filetype: 'jpg',
            pretty_type: 'JPEG',
            user: 'U05C0JQTXNG',
            user_team: 'T05BV7UH7FF',
            editable: false,
            size: 4898570,
            mode: 'hosted',
            is_external: false,
            external_type: '',
            is_public: true,
            public_url_shared: false,
            display_as_bot: false,
            username: '',
            url_private:
              'https://files.slack.com/files-pri/T05BV7UH7FF-F05CMTSRZDE/goku.jpeg',
            url_private_download:
              'https://files.slack.com/files-pri/T05BV7UH7FF-F05CMTSRZDE/download/goku.jpeg',
            media_display_type: 'unknown',
            thumb_64:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_64.jpg',
            thumb_80:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_80.jpg',
            thumb_360:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_360.jpg',
            thumb_360_w: 360,
            thumb_360_h: 225,
            thumb_480:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_480.jpg',
            thumb_480_w: 480,
            thumb_480_h: 300,
            thumb_160:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_160.jpg',
            thumb_720:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_720.jpg',
            thumb_720_w: 720,
            thumb_720_h: 450,
            thumb_800:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_800.jpg',
            thumb_800_w: 800,
            thumb_800_h: 500,
            thumb_960:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_960.jpg',
            thumb_960_w: 960,
            thumb_960_h: 600,
            thumb_1024:
              'https://files.slack.com/files-tmb/T05BV7UH7FF-F05CMTSRZDE-a5496f1284/goku_1024.jpg',
            thumb_1024_w: 1024,
            thumb_1024_h: 640,
            original_w: 2880,
            original_h: 1800,
            thumb_tiny:
              'AwAeADCugyWXHGOPY1OqLHtj2Bmz81QqpZ22qSSMirIGQh6kDHPv2roGIsS87o1xnpjrULxh1DhMADkVZYMX4znB5prHaWZgQCu0e9ICmfnbngCmhiM7cAfSp3UbFATbn8zUbIg/j6dadgsiWKbY4Izz2NXN2IyeOuM4qpbOPun+Lpx0qyG/dYHOCck0mC3AoxOTIu7tQSxjbJDEY6iq7SyCUAOflOM1YDbVct8wA/OpsUyCQllJAy6nqOlVCjDORVq5lWMlADx1xxmoCg2bkJHsaom5/9k=',
            permalink:
              'https://huntytestmigu-ol64996.slack.com/files/U05C0JQTXNG/F05CMTSRZDE/goku.jpeg',
            permalink_public:
              'https://slack-files.com/T05BV7UH7FF-F05CMTSRZDE-fe031aef3b',
            is_starred: false,
            has_rich_preview: false,
            file_access: 'visible',
          },
        ],
        settings: {
          channel: 'AS23AS',
        },
      },
    ]);
  });
  it('Should be send slack messages by channel', async () => {
    const spy = jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        ok: true,
      },
    });
    jest.spyOn(cacheClientPortMock, 'get').mockResolvedValue(undefined);
    const rs = await controller.sendSlackMessageToChannel({
      channels: ['ASD1', 'ASD2', 'ASD3', 'ASD4', 'ASD5', 'ASD6', 'ASD7'],
      message: 'Test',
      referenceId: 'uuid',
    });
    expect(spy).toBeCalledTimes(7);
    expect(rs).toEqual({
      message: 'Success!',
    });
  });
  it('Should be attach file to slack', async () => {
    const spy = jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        ok: true,
      },
    });
    await controller.attachFileToSlackChannel(
      {
        buffer: new Buffer(''),
        originalname: 'name',
        mimetype: 'image/jpeg',
      } as any,
      'channel',
    );
    expect(spy).toHaveBeenCalled();
  });
});
