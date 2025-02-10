import { Module } from '@nestjs/common';
import { rabbitmqController } from './rabbitmq.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQService } from './rabbitmq.service'
import { Signal, SignalSchema } from '../signals/signal.schema'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
  ],
  controllers: [rabbitmqController],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule { }