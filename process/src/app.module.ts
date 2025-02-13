import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import { SignalModule } from './signals/signal.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module'
import { RabbitMQService } from './rabbitmq/rabbitmq.service'
import { WinstonLoggerService } from './logger.service'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService]
    }),
    SignalModule,
    RabbitMQModule
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    WinstonLoggerService,
    RabbitMQService],

  controllers: [],
})
export class AppModule { }
