import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './match.schema';
import { MatchService } from './match.service';
import { RedisModule } from '../redis/redis.module';
import { RuleService } from 'src/rule/rule.service';
import { RuleModule } from 'src/rule/rule.module';
import { MatchController } from './DTO/match.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    RedisModule,
    RuleModule
  ],
  controllers:[MatchController],
  providers: [MatchService, RuleService],
  exports: [MatchService]
})
export class MatchModule { }

