import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { MatchService } from 'src/matches/match.service';
import { CreateEventDto } from '../event/DTO/create-event.dto'
import {EventDto} from '../event/DTO/event-dto'
@Injectable()
export class RabbitMQService {
  constructor(
    private readonly eventService: EventService,
    private readonly matchSrvice: MatchService
  ) { }

  async create(data: CreateEventDto) {
    return await this.eventService.create(data);
  }

  async checkMatchRule(data: EventDto) {
    await this.matchSrvice.matchEventWithAllRules(data)

  }
}

