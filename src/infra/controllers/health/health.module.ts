import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  providers: [],
  imports: [ConfigModule.forRoot()],
})
export class HealthModule {}
