import { IsString, IsOptional, IsDate, IsNumber, IsIn ,IsMongoId} from 'class-validator';
import { Type } from 'class-transformer';

export class RuleDto {
  @IsString()
  // @IsMongoId()
  // _id: string;
  _id: unknown; 

  @IsIn(['==', '!=', '>', '<', '>=', '<=']) 
  operator: string;

  @IsString()
  operand1: string;

  @IsNumber()
  operand2: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deletedAt?: Date | null;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class RuleDtoArray {
  rules: RuleDto[];
}
