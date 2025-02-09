import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRuleDto {
  @ApiProperty({
    description: 'The operator for the rule',
    enum: ['<', '>', '==', '>=', '<='],
    example: '>=',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['<', '>', '==', '>=', '<='], { message: 'Operator must be one of <, >, <=, >= or ==' })
  operator?: string;

  @ApiProperty({
    description: 'The first operand for the rule',
    example: 'pressure',
    required: false,
  })

  @IsOptional()
  operand1?: string;

  @ApiProperty({
    description: 'The second operand for the rule',
    example: 150,
    required: false,  
  })
  @IsOptional()
  operand2?: number;

  @ApiProperty({
    description: 'The name of the rule',
    example: 'Updated Pressure Rule',
    required: false,  
  })
  @IsOptional()
  @IsString()
  name?: string;
}