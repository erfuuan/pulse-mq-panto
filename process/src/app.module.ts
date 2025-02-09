import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service'
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MatchModule } from './matches/match.module';
import { RuleModule } from './rule/rule.module'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module'
import { RuleService } from './rule/rule.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService]
    }),
    EventModule,
    RabbitMQModule,
    MatchModule,
    RuleModule,
    RedisModule,
  ],
  providers: [RabbitMQService, RuleService],

  controllers: [],
})
export class AppModule { }
