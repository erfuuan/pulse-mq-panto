import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AgentService } from './agent.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [],
      validationSchema: Joi.object({
        AGENT_ID: Joi.string().required().min(3).max(20).label('Agent ID'),
        RABBITMQ_URL: Joi.string().uri().required().label('RabbitMQ URL'),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'EVENT_PUBLISHER',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqUrl = configService.get<string>('RABBITMQ_URL');

          if (!rabbitMqUrl) {
            throw new Error('RABBITMQ_URL is not defined in the environment');
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUrl],
              queue: 'test',
              queueOptions: { durable: false },
            },
          };
        },
      },
    ]),
  ],
  providers: [AgentService],
})
export class AppModule { }
