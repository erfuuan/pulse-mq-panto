import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSignaConsumerlDto } from '../signals/DTO/create-signal-consumer.dto'
import { SignalService } from '../signals/signal.service'
import { processXRayData } from '../utils/msgProccess'
import { WinstonLoggerService } from '../logger.service'
@Controller()
export class rabbitmqController {
  constructor(
    private readonly signalService: SignalService,
    private readonly logger: WinstonLoggerService
  ) { }

  @MessagePattern('xray1')
  async handleEventCreated(@Payload() event: CreateSignaConsumerlDto) {
    this.logger.log(`🚀 Message received: ${JSON.stringify(event)}`);

    const data = processXRayData(event)
    await this.signalService.create(data)

  }
}
