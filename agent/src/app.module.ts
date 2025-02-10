import { Module } from '@nestjs/common';
import { EventService } from './events/event.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  providers: [EventService, RabbitMQService],
  exports: [RabbitMQService],
})
export class AppModule { }