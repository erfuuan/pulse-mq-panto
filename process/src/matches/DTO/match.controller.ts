import { Controller, Get, Query, Param } from '@nestjs/common';
import { GetEventByTimeRangeDto } from '../DTO/matched-event.schema';
import { MatchService } from '../match.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('match')
export class MatchController {
    constructor(
        private readonly matchService: MatchService) { }

    @Get('rule-times')
    @ApiOperation({ summary: 'Get event times for a specific rule within a time range' })
    @ApiResponse({ status: 200, description: 'Return event times matching the rule within the specified time range.' })
    @ApiResponse({
        status: 400,
        description: 'Bad request, invalid input parameters.',
    })
    async getEventTimesForRule(@Query() getEventByTimeRangeDto: GetEventByTimeRangeDto) {
        const { ruleId, startTime, endTime } = getEventByTimeRangeDto;
        return await this.matchService.getEventTimesForRule(ruleId, startTime, endTime);
    }


    @Get('rule/:ruleId/agents')
    @ApiOperation({ summary: 'Get the list of agents based on event count for a specific rule' })
    @ApiResponse({ status: 200, description: 'Return a list of agents ordered by event count for the specified rule.' })
    @ApiParam({ name: 'ruleId', required: true, description: 'The ID of the rule to retrieve agent list for.', type: String })
    @ApiResponse({ status: 404, description: 'Rule not found.' })
    async getAgentListByEventCount(@Param('ruleId') ruleId: string) {
        const agentList = await this.matchService.getAgentListByEventCount(ruleId);
        return agentList;
    }
}
