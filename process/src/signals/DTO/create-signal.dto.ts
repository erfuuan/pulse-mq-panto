import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class SignalDataDto {
  @ApiProperty({ description: 'X coordinate', example: 51.3405 })
  @IsNumber()
  x: number;

  @ApiProperty({ description: 'Y coordinate', example: 12.3394 })
  @IsNumber()
  y: number;

  @ApiProperty({ description: 'Speed value', example: 0.616 })
  @IsNumber()
  speed: number;
}

export class CreateSignalDto {
  @ApiProperty({ description: 'The unique device ID', example: '968c4eb9-1a9a-44a5-a4be-277de049c5c6' })
  @IsUUID()
  deviceId: string;

  @ApiProperty({ description: 'The timestamp when the data was received', example: 1739450223904 })
  @IsNumber()
  time: number;

  @ApiProperty({ description: 'Total number of data points', example: 5 })
  @IsNumber()
  dataLength: number;

  @ApiProperty({ description: 'Sum of all speed values', example: 25.347 })
  @IsNumber()
  dataVolume: number;

  @ApiProperty({ description: 'Array of x-ray data points' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SignalDataDto)
  data: SignalDataDto[];
}
