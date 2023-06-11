import axios from 'axios';
import { SlackApiAdapter } from '@infra/adapters/slack-api';
import {
  fileMessageFixture,
  integrationMessageFixture,
} from '@domain/__spec__/fixtures/models.fixture';
import {
  AttachFileSlackException,
  GetMessageSlackException,
  SendMessageSlackException,
} from '@domain/exceptions';

jest.mock('axios');

describe('ADAPTER | Slack Api', () => {
  let service: SlackApiAdapter;
  beforeAll(async () => {
    service = new SlackApiAdapter();
  });
  describe('RESOURCE | getMessage', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
    it('Should be get slack message', async () => {
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
      const response = await service.getMessage(
        integrationMessageFixture({
          settings: {
            channel: 'ASDA123',
          },
        }),
      );
      expect(response).toMatchObject([
        {
          id: '1512085950.000216',
          user: 'U012AB3CDE',
          message: 'I find you punny and would like to smell your nose letter',
          provider: 'Slack',
          settings: {
            channel: 'ASDA123',
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
            channel: 'ASDA123',
          },
        },
      ]);
    });
    it('Should be fail and throw  GetMessageSlackException Exception', async () => {
      jest.spyOn(axios, 'post').mockRejectedValue(new Error());
      try {
        await service.getMessage(integrationMessageFixture());
      } catch (e) {
        expect(e).toBeInstanceOf(GetMessageSlackException);
      }
    });
    it('Should be fail by ok value false and throw GetMessageSlackException Exception', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          ok: false,
          error: 'channel_not_found',
        },
      });
      try {
        await service.getMessage(
          integrationMessageFixture({
            settings: {
              channel: 'ASDA123',
            },
          }),
        );
      } catch (e) {
        expect(e).toBeInstanceOf(GetMessageSlackException);
        expect(e.message).toEqual('channel_not_found');
      }
    });
  });

  describe('RESOURCE | sendMessage', () => {
    it('Should be send slack messages', async () => {
      const spy = jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          ok: true,
        },
      });
      await service.sendMessage(
        integrationMessageFixture({
          settings: {
            channel: 'ASDA123',
          },
        }),
      );
      expect(spy).toHaveBeenCalled();
    });
    it('Should be fail and throw SendMessageSlackException Exception', async () => {
      jest.spyOn(axios, 'post').mockRejectedValue(new Error());
      try {
        await service.sendMessage(integrationMessageFixture());
      } catch (e) {
        expect(e).toBeInstanceOf(SendMessageSlackException);
      }
    });
    it('Should be fail by ok value false and throw SendMessageSlackException Exception', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          ok: false,
          error: 'channel_not_found',
        },
      });
      try {
        await service.sendMessage(
          integrationMessageFixture({
            settings: {
              channel: 'ASDA123',
            },
          }),
        );
      } catch (e) {
        expect(e).toBeInstanceOf(SendMessageSlackException);
        expect(e.message).toEqual('channel_not_found');
      }
    });
  });

  describe('RESOURCE | attachFilev', () => {
    it('Should be send slack messages', async () => {
      const spy = jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          ok: true,
        },
      });
      await service.attachFile(
        fileMessageFixture(),
        integrationMessageFixture({
          settings: {
            channel: 'ASDA123',
          },
        }),
      );
      expect(spy).toHaveBeenCalled();
    });
    it('Should be fail and throw AttachFileSlackException Exception', async () => {
      jest.spyOn(axios, 'post').mockRejectedValue(new Error());
      try {
        await service.attachFile(
          fileMessageFixture(),
          integrationMessageFixture({
            settings: {
              channel: 'ASDA123',
            },
          }),
        );
      } catch (e) {
        expect(e).toBeInstanceOf(AttachFileSlackException);
      }
    });
    it('Should be fail by ok value false and throw AttachFileSlackException Exception', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          ok: false,
          error: 'channel_not_found',
        },
      });
      try {
        await service.attachFile(
          fileMessageFixture(),
          integrationMessageFixture({
            settings: {
              channel: 'ASDA123',
            },
          }),
        );
      } catch (e) {
        expect(e).toBeInstanceOf(AttachFileSlackException);
        expect(e.message).toEqual('channel_not_found');
      }
    });
  });
});
