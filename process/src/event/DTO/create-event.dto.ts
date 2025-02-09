import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNumber({}, { message: 'Value must be a number' })
  value: number;

  @IsString({ message: 'AgentId must be a string' })
  agentId: string;

  @IsDateString({}, { message: 'Timestamp must be a valid date string' })
  timestamp: string;

  @IsOptional()
  @IsDateString({}, { message: 'CreatedAt must be a valid date string' })
  createdAt?: string;

}
