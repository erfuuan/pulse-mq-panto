import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetEventByTimeRangeDto {
  @ApiProperty({
    description: 'ID of the rule for which we want to fetch event times',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  ruleId: string;

  @ApiProperty({
    description: 'Start time for the range in ISO 8601 format',
    type: String,
    example: '2025-02-07T00:00:00Z',
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    description: 'End time for the range in ISO 8601 format',
    type: String,
    example: '2025-02-07T23:59:59Z',
  })
  @IsDateString()
  endTime: string;
}
