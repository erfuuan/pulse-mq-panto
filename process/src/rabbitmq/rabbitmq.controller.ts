import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { CreateEventDto } from '../event/DTO/create-event.dto'
@Controller()
export class rabbitmqController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
  ) { }

  @MessagePattern('event_pattern_test')
  async handleEventCreated(@Payload() event: CreateEventDto) {
    const createdEvent = await this.rabbitMQService.create(event)
    await this.rabbitMQService.checkMatchRule(createdEvent)
  }
}
