import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './DTO/create-rule.dto';
import { UpdateRuleDto } from './DTO/update-rule.dto';
import { GetOneDto } from './DTO/getOne-rule.dto';
import { IRule } from './rule.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('rules')
@Controller('rules')
export class RuleController {
  constructor(private readonly ruleService: RuleService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new rule' })
  @ApiBody({ type: CreateRuleDto })
  @ApiResponse({ status: 201, description: 'The rule has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createRule(@Body() createRuleDto: CreateRuleDto): Promise<IRule> {
    return this.ruleService.create(createRuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rules' })
  @ApiResponse({ status: 200, description: 'List of all rules.', type: [CreateRuleDto] })
  async getAllRules(): Promise<IRule[]> {
    return this.ruleService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rule by ID' })
  @ApiResponse({ status: 200, description: 'Found the rule.', type: CreateRuleDto })
  @ApiResponse({ status: 404, description: 'Rule not found.' })
  async getOneRule(@Param() params: GetOneDto): Promise<IRule> {
    return this.ruleService.getOne(params.id);
  }

  
  @Put(':id')
  @ApiOperation({ summary: 'Update a rule by ID' })
  @ApiBody({ type: UpdateRuleDto })
  @ApiResponse({ status: 200, description: 'The rule has been successfully updated.', type: CreateRuleDto })
  @ApiResponse({ status: 404, description: 'Rule not found.' })
  async updateRule(
    @Param('id') id: string,
    @Body() updateRuleDto: UpdateRuleDto,
  ): Promise<IRule | null> {
    return this.ruleService.update(id, updateRuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rule by ID' })
  @ApiResponse({ status: 200, description: 'The rule has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Rule not found.' })
  async deleteRule(@Param() params: GetOneDto): Promise<{ message: string; statusCode: number }> {
    await this.ruleService.softDelete(params.id);
    return { message: 'Rule deleted successfully', statusCode: 200 };
  }
}
