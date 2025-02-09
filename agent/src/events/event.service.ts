import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventService implements OnModuleInit {
  constructor(@Inject('EVENT_PUBLISHER') private readonly client: ClientProxy) {}

  onModuleInit() {
  }
}

