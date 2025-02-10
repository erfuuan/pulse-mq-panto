import { Module } from '@nestjs/common';
import { SignalModule } from './signals/signal.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './rabbitmq/rabbit.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    RabbitMQModule,
    SignalModule,
  ],
})
export class AppModule { }
