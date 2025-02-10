import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { XrayDataDto } from '../events/event.dto';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      options: {
        transport: 2,  // 2 corresponds to Transport.RMQ
        urls: [this.configService.get<string>('RABBITMQ_URL')],
        queue: this.configService.get<string>('RABBITMQ_QUEUE'),
        queueOptions: {
          durable: false,
        },
      },
    });
  }
  async emitXrayData(data: XrayDataDto) {
    this.client.emit('xray_data_event', data);
  }
}