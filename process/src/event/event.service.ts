import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEvent } from './event.schema';
import { RedisService } from 'src/redis/redis.service';
import { CreateEventDto } from './DTO/create-event.dto';
@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private eventModel: Model<IEvent>,

  ) { }

  async create(createEventDto: CreateEventDto) {
    const event = new this.eventModel(createEventDto);
    await event.save()
    return event;
  }

}
