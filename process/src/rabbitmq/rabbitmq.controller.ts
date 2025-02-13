import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSignalDto } from '../signals/DTO/create-signal.dto'
import { SignalService } from '../signals/signal.service'
@Controller()
export class rabbitmqController {
  constructor(
    private readonly signalService: SignalService
  ) { }

  @MessagePattern('xray1')
  async handleEventCreated(@Payload() event: CreateSignalDto) {
    console.log("🚀 Message received:", JSON.stringify(event));
    await this.signalService.create(event)

  }
}
