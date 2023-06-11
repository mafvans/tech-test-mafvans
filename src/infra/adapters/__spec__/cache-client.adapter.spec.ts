import { NestCacheClientAdapter } from '@infra/adapters/nest-cache-client';

describe('ADAPTER | Cache Client', () => {
  let cacheClientAdapter: NestCacheClientAdapter;
  let cacheManager: any;

  beforeEach(() => {
    cacheManager = {
      get: jest.fn().mockResolvedValue({}),
      set: jest.fn().mockResolvedValue({}),
    };

    cacheClientAdapter = new NestCacheClientAdapter(cacheManager);
  });

  describe('RESOURCE | get', () => {
    it('should call cacheManager.get with key', async () => {
      const key = 'test-key';
      await cacheClientAdapter.get(key);

      expect(cacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should return value from cacheManager.get', async () => {
      const key = 'test-key';
      const value = { test: 'value' };
      cacheManager.get.mockResolvedValue(value);

      const result = await cacheClientAdapter.get(key);

      expect(result).toEqual(value);
    });
  });

  describe('RESOURCE | set', () => {
    it('should call cacheManager.set with key and value', async () => {
      const key = 'test-key';
      const value = { test: 'value' };
      await cacheClientAdapter.set(key, value);

      expect(cacheManager.set).toHaveBeenCalledWith(key, value);
    });
  });
});
