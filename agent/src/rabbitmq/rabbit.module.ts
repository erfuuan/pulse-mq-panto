import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';
// import { SignalModule } from '../signals/signal.module';

@Module({
    imports: [
        // SignalModule,
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: 'RABBITMQ_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                    const rabbitMqUrl = configService.get<string>('RABBITMQ_URL');
                    const queue = configService.get<string>('RABBITMQ_QUEUE');

                    if (!rabbitMqUrl || !queue) {
                        throw new Error('❌ RabbitMQ configuration is missing in the .env file.');
                    }

                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [rabbitMqUrl],
                            queue: queue,
                            queueOptions: { durable: false },
                        },
                    };
                },
            },
        ]),
    ],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }
