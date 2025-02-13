import { IsArray, IsNumber, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSignalDto {
  @ApiProperty({
    description: 'The unique device ID',
    example: '968c4eb9-1a9a-44a5-a4be-277de049c5c6',
  })
  @IsString()
  deviceId: string;

  @ApiProperty({
    description: 'Array of timestamped data with coordinates or other data',
    example: [[5042, [51.3399, 12.338, 1.8521]]],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  data: Array<[number, [number, number, number]]>;

  @ApiProperty({
    description: 'The timestamp when the data was received',
    example: 1739450223904,
  })
  @IsNumber()
  time: number;
}