import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CacheClientPort } from '@application/ports';
import { Cache } from 'cache-manager';

@Injectable()
export class NestCacheClientAdapter implements CacheClientPort {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T> {
    return (await this.cacheManager.get(key)) as T;
  }

  async set(key: string, value: unknown): Promise<void> {
    await this.cacheManager.set(key, value);
  }
}
