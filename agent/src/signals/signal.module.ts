import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { RabbitMQModule } from '../rabbitmq/rabbit.module'
@Module({
  imports: [RabbitMQModule],
  providers: [SignalService, RabbitMQService],
  exports: [SignalService],

})
export class SignalModule { }