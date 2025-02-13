import { IsArray, IsNumber, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSignalDto {
  @ApiProperty({
    description: 'The unique device ID (optional for update)',
    example: '968c4eb9-1a9a-44a5-a4be-277de049c5c6',
    required: false,
  })
  @IsString()
  deviceId?: string;

  @ApiProperty({
    description: 'Array of timestamped data with coordinates or other data (optional for update)',
    example: [[5042, [51.3399, 12.338, 1.8521]]],
    required: false,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  data?: Array<[number, [number, number, number]]>;

  @ApiProperty({
    description: 'The timestamp when the data was received (optional for update)',
    example: 1739450223904,
    required: false,
  })
  @IsNumber()
  time?: number;
}