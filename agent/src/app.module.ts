// import { Module } from '@nestjs/common';
// import { SignalModule } from './signals/signal.module';
// import { ConfigModule } from '@nestjs/config';
// import { RabbitMQModule } from './rabbitmq/rabbit.module';
// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     ScheduleModule.forRoot(),
//     RabbitMQModule,
//     SignalModule,
//   ],
// })
// export class AppModule { }


import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SignalService} from './signals/signal.service' 


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [],
      validationSchema: Joi.object({
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
  providers: [SignalService],
})
export class AppModule { }
