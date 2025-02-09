import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';

@Injectable()
export class AgentService implements OnModuleInit {
  private readonly agentId: string;

  constructor(
    @Inject('EVENT_PUBLISHER') private readonly client: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    this.agentId = this.configService.get<string>('AGENT_ID') || 'default-agent-id';
    if (!this.agentId) {
      throw new Error('AGENT_ID is required but not defined in the .env file');
    }
  }

  sendEvent() {
    const all = ["temperature", "speed", "pressure", "voltage", "noise", "light_intensity"]
    const event = {
      agentId: this.agentId,
      name: all[faker.number.int({ min: 0, max: 5

       })],
      value: faker.number.int({ min: 1, max: 10 }),
      timestamp: new Date().toISOString(),
    };
    this.client.emit('event_pattern_test', event);
    console.log('📤 Event sent:', event);
  }
  onModuleInit() {
    this.client.connect()
      .then(() => {
        console.log('Connected to RabbitMQ!');
      })
      .catch((error) => {
        console.error('Failed to connect to RabbitMQ:', error);
        process.exit(0)
      });
  }
}
