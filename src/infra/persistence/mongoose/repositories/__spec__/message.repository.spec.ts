import { Model } from 'mongoose';
import { AddDocumentToDatabaseException } from '@domain/exceptions';
import { MessageInterface } from '@infra/persistence/mongoose/interfaces';
import { MessageRepository } from '@infra/persistence/mongoose/repositories';
import { integrationMessageFixture } from '@domain/__spec__/fixtures/models.fixture';

describe('REPOSITORY | Message', () => {
  class MessageModel {
    constructor(arg: object) {}
    static findOne(): unknown {
      return jest.fn();
    }
    save(): unknown {
      return jest.fn().mockReturnValue(null);
    }
  }

  let repository: MessageRepository;
  beforeEach(() => {
    repository = new MessageRepository(
      MessageModel as unknown as Model<MessageInterface>,
    );
  });

  describe('SUCCESS', () => {
    it('should be add document', async () => {
      const spy = (MessageModel.findOne = jest.fn().mockResolvedValue(null));
      await repository.add(integrationMessageFixture());
      expect(spy).toHaveBeenCalled();
    });
    it('should be skip add document by existing referenceId', async () => {
      const spy = (MessageModel.findOne = jest
        .fn()
        .mockResolvedValue({ id: 'id' }));
      await repository.add(integrationMessageFixture());
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('FAILED ', () => {
    it('should be return AddDocumentToDatabaseException exception', async () => {
      try {
        await repository.add({} as any);
      } catch (e) {
        expect(e).toBeInstanceOf(AddDocumentToDatabaseException);
      }
    });
  });
});
