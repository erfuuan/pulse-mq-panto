import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({
  providers: [EventService, RabbitMQService],
})
export class EventModule {}
