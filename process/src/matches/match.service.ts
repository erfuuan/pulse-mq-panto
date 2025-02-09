import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import * as jsonLogic from 'json-logic-js';
import { CreateMatchDto } from './DTO/create-match.dto';
import { IMatch } from './match.schema';
import { EventDto } from 'src/event/DTO/event-dto';
import { RuleDto } from 'src/rule/DTO/rule-dto';
import { Event } from './DTO/AgentListByEventCount.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<IMatch>,
    private readonly redisService: RedisService,
  ) { }


  async matchEventWithAllRules(eventData: EventDto): Promise<void> {
    const cacheRule = await this.redisService.searchKeys(`${eventData.name}*`)
    let rules
    rules = []
    if (cacheRule.length) { rules = await this.redisService.getMultiple(cacheRule) }
    if (rules.length > 0) {
      await Promise.all(
        rules.map(async (rule) => {
          const parsedRule = JSON.parse(rule!);
          const matchResult = await this.matchEventWithRule(eventData, parsedRule);
          if (matchResult) {
            await this.create({
              agentId: eventData.agentId,
              ruleId: parsedRule._id,
              eventId: eventData._id,
            });
          }
        }),
      );
    }
  }

  async matchEventWithRule(eventData: EventDto, rule: RuleDto): Promise<boolean> {
    const jsonLogicRule = { [rule.operator]: [{ var: 'value' }, rule.operand2] };
    const result = jsonLogic.apply(jsonLogicRule, eventData);
    return result;
  }


  async create(createMatchDto: CreateMatchDto): Promise<IMatch> {
    const match = new this.matchModel(createMatchDto);
    return await match.save();
  }

  async getEventTimesForRule(ruleId: string, startTime: string, endTime: string) {
    const events = await this.matchModel
      .find({
        ruleId,
        createdAt: { $gte: new Date(startTime), $lte: new Date(endTime) },
      })
      .populate('ruleId')
      .populate('eventId')
      .exec();
    return events
  }

  async getAgentListByEventCount(ruleId: string): Promise<Event[]> {
    const aggregationPipeline: any[] = [
      {
        $match: {
          ruleId: ruleId,
        },
      },
      {
        $group: {
          _id: '$agentId',
          eventCount: { $sum: 1 },
        },
      },
      {
        $sort: { eventCount: -1 },
      },
      {
        $project: {
          agentId: '$_id',
          eventCount: 1,
          _id: 0,
        },
      },
    ];
    return await this.matchModel.aggregate(aggregationPipeline);
  }
}