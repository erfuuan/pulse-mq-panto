import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface IMatch extends Document {
  agentId: string;
  ruleId: Types.ObjectId;
  eventId: Types.ObjectId;
  createdAt: Date;
}

@Schema({
  timestamps: { createdAt: 'createdAt' },
  versionKey: false
})
export class Match extends Document {
  @ApiProperty({
    description: 'The unique identifier of the agent',
    example: 'agent_12345',
  })
  @Prop({ required: true, index: true })
  agentId: string;

  @ApiProperty({
    description: 'The ID of the rule associated with the event',
    example: '652a1b2c3d4e5f67890abcd1',
  })
  @Prop({ type: Types.ObjectId, ref: 'Rule', required: true, index: true })
  ruleId: Types.ObjectId;

  @ApiProperty({
    description: 'The ID of the event related to the rule',
    example: '652f1a2b3c4d5e67890bcdf2',
  })
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @ApiProperty({
    description: 'The timestamp when the match was created',
    example: '2023-10-08T12:34:56.789Z',
  })
  @Prop()
  createdAt: Date;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
