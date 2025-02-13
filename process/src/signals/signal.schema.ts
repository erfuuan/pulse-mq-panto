import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface ISignal extends Document {
  deviceId: string;
  data: Array<[number, [number, number, number]]>;
  time: number;
  createdAt: Date;
}

@Schema({
  timestamps: { createdAt: 'createdAt' },
  versionKey: false,
})
export class Signal extends Document {

  @ApiProperty({
    description: 'The unique device ID',
    example: '968c4eb9-1a9a-44a5-a4be-277de049c5c6',
  })
  @Prop({ required: true })
  deviceId: string;

  @ApiProperty({
    description: 'Array of timestamped data with coordinates or other data',
    example: [[5042, [51.3399, 12.338, 1.8521]]],
  })
  @Prop({ required: true })
  data: Array<[number, [number, number, number]]>;

  @ApiProperty({
    description: 'The timestamp when the data was received',
    example: 1739450223904,
  })
  @Prop({ required: true })
  time: number;

  @ApiProperty({
    description: 'The timestamp when the data was created (generated on the server)',
    example: '2025-02-06T12:00:00.000Z',
  })
  @Prop()
  createdAt: Date;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
