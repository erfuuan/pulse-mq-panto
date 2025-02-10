import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface ISignal extends Document {
  name: string;
  value: number;
  timestamp: Date;
  agentId: string;
}

@Schema({
  timestamps: { createdAt: 'createdAt' },
  versionKey: false
})
export class Signal extends Document {

  @ApiProperty({
    description: 'The name of the signal',
    example: 'CPU_Usage_High',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The value associated with the signal',
    example: 85,
  })
  @Prop({ required: true })
  value: number;

  @ApiProperty({
    description: 'The unique identifier of the agent generating the signal',
    example: 'agent_56789',
  })
  @Prop({ required: true })
  agentId: string;

  @ApiProperty({
    description: 'The timestamp when the signal was created',
    example: '2023-10-08T14:25:43.511Z',
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    description: 'The specific timestamp when the signal occurred',
    example: '2023-10-08T13:00:00.000Z',
  })
  @Prop()
  timestamp: Date;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);