import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { EventModule } from '../event/event.module';
import { EventService } from '../event/event.service'
import { rabbitmqController } from './rabbitmq.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from 'src/event/event.schema';
import { MatchModule } from '../matches/match.module'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MatchModule,
    EventModule,
  ],
  providers: [RabbitMQService, EventService],
  controllers: [rabbitmqController],
  exports: [RabbitMQService],
})
export class RabbitMQModule { }