import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  agentId: string;

  @IsMongoId()
  @IsNotEmpty()
  ruleId: string;

  @IsMongoId()
  @IsNotEmpty()
  eventId: string;
}