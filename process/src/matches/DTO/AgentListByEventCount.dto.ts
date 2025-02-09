import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface IEvent extends Document {
  eventCount: number;
  agentId: string;
}

@Schema({
  timestamps: { createdAt: 'createdAt' },
  versionKey: false,
})
export class Event extends Document {
  @ApiProperty({
    description: 'The count of events',
    example: 5049,
  })
  @Prop({ required: true })
  eventCount: number;

  @ApiProperty({
    description: 'The unique identifier of the agent',
    example: 'test1',
  })
  @Prop({ required: true })
  agentId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
