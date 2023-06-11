import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerProvider } from '@infra/adapters/logger';
import { HealthModule } from '@infra/controllers/health/health.module';
import { ControllersModule } from '@infra/controllers/controllers.module';
import { MessageModule } from '@infra/persistence/mongoose/message.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/huntydb'),
    HealthModule,
    MessageModule,
    ControllersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class AppModule {}
