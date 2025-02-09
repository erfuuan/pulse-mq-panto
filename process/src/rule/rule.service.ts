import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRule, Rule } from './rule.schema';
import { CreateRuleDto } from './DTO/create-rule.dto';
import { UpdateRuleDto } from './DTO/update-rule.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RuleService {
    constructor(
        @InjectModel(Rule.name) private readonly ruleModel: Model<Rule>,
        private readonly redisService: RedisService,
    ) { }

    async create(createRuleDto: CreateRuleDto): Promise<IRule> {
        const createdRule = new this.ruleModel(createRuleDto);
        const created = await createdRule.save();
        if (created) {
            await this.redisService.set(`${created.operand1}-${created.id}`, JSON.stringify(created));
        }
        return created;
    }

    async getAll(): Promise<IRule[]> {
        return await this.ruleModel.find({ deletedAt: null }).exec();
    }

    async getOne(id: string): Promise<IRule> {
        const item = await this.ruleModel.findOne({ _id: id, deletedAt: null }).exec();
        if (!item) {
            throw new NotFoundException(`Rule with ID ${id} not found`);
        }
        return item;
    }

    async update(id: string, updateRuleDto: UpdateRuleDto): Promise<IRule | null> {
        const updatedRule = await this.ruleModel.findByIdAndUpdate(id, updateRuleDto, { new: true });
        if (!updatedRule) {
            throw new NotFoundException(`Rule with ID ${id} not found`);
        }
        
        await this.redisService.set(`rule-${updatedRule.operand1}-${updatedRule.id}`, JSON.stringify(updatedRule));
        return updatedRule;
    }

    
    async delete(id: string): Promise<void> {
        const deleted = await this.ruleModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new NotFoundException(`Rule with ID ${id} not found`);
        }
        await this.redisService.del(`rule-${deleted.name}-${deleted.id}`);
    }

    async softDelete(ruleId: string): Promise<IRule | null> {
        const softDeleted = await this.ruleModel.findByIdAndUpdate(
            ruleId,
            { deletedAt: new Date() },
            { new: true }
        );
        if (!softDeleted) {
            throw new NotFoundException(`Rule with ID ${ruleId} not found`);
        }
        await this.redisService.del(`rule-${softDeleted.name}-${softDeleted.id}`);
        return softDeleted;
    }

    async coldStart(): Promise<void> {
        try {
            const rules = await this.ruleModel.find({ deletedAt: null }).exec();
            await this.redisService.setRuleData(rules);
        } catch (error) {
            console.error('Error during cold start:', error);
        }
    }
}