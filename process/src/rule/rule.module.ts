import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleSchema, Rule } from './rule.schema';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { RedisModule } from '../redis/redis.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
    RedisModule,
  ],
  controllers: [RuleController],
  providers: [RuleService],

  exports: [RuleService, MongooseModule],
})
export class RuleModule { }