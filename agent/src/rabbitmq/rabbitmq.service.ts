// import { Injectable } from '@nestjs/common';
// import { Inject } from '@nestjs/common';  // Corrected import
// import { ClientProxy } from '@nestjs/microservices';
// import { ConfigService } from '@nestjs/config';
// import { XrayDataDto } from '../signals/signal.dto';
// @Injectable()
// export class RabbitMQService {
//   constructor(
//     private  configService: ConfigService,
//     @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy, // Corrected Inject usage
//   ) {}
//   // Emit message with XrayDataDto to the 'xray1' routing key
//   async emitXrayData(data: XrayDataDto) {
//     console.log('Sending data to xray1 queue');
//     this.client.emit('xray1', data);
//   }
// }


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { XrayDataDto } from '../signals/signal.dto';
@Injectable()
export class RabbitMQService {
  private client: ClientProxy;
  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      options: {
        transport: 2,  // 2 corresponds to Transport.RMQ
        urls: [this.configService.get<string>('RABBITMQ_URL')],
        queue: this.configService.get<string>('RABBITMQ_QUEUE'),
        queueOptions: { durable: false },
      },
    });
  }
  async emitXrayData(data: XrayDataDto) {
    this.client.emit('xray1', data);
  }
}
