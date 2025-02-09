import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface IRule extends Document {
  operator: string;
  operand1: string;
  operand2: number;
  name: string;
}

@Schema({
  timestamps: { createdAt: 'createdAt' },
  versionKey: false
})
export class Rule extends Document {

  @ApiProperty({
    description: 'The operator used in the rule (e.g., ">", "<", "==")',
    example: '>',
  })
  @Prop({ required: true })
  operator: string;

  @ApiProperty({
    description: 'The first operand for the rule operation',
    example: 50,
  })
  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  operand1: string;

  @ApiProperty({
    description: 'The second operand for the rule operation',
    example: 100,
  })
  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  operand2: number;

  @ApiProperty({
    description: 'The name of the rule',
    example: 'High Temperature Alert',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The timestamp when the rule was created',
    example: '2023-10-08T14:25:43.511Z',
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the rule was deleted (if applicable)',
    example: '2024-01-01T10:00:00.000Z',
    nullable: true,
  })
  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
