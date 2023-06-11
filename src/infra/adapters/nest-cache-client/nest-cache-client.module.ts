import { CacheModule, Module } from '@nestjs/common';
import { NestCacheClientAdapter } from '@infra/adapters/nest-cache-client';
import { CacheClientPort } from '@application/ports';

const configProvider = {
  provide: CacheClientPort,
  useClass: NestCacheClientAdapter,
};
@Module({
  imports: [
    CacheModule.register({
      max: 100,
      ttl: 86400,
      isGlobal: true,
    }),
  ],
  providers: [configProvider],
  exports: [configProvider],
})
export class NestCacheClientModule {}
