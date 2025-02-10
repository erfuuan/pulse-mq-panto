import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSignalDto } from '../signals/DTO/create-signal.dto'
@Controller()
export class rabbitmqController {
  constructor(
    // private readonly rabbitMQService: RabbitMQService,
  ) { }

  @MessagePattern('xray1')

  async handleEventCreated(@Payload() event: CreateSignalDto) {
    console.log("START")
    try {
      console.log("🚀 Message received:");
      console.log(event);
    } catch (error) {
      console.error("❌ Error processing message:", error);
    }
  }
}
