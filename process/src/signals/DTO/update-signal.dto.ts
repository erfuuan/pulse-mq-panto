import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsArray, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SignalDataDto {
  @ApiProperty({ description: 'X coordinate', example: 51.3405, required: false })
  @IsOptional()
  @IsNumber()
  x?: number;

  @ApiProperty({ description: 'Y coordinate', example: 12.3394, required: false })
  @IsOptional()
  @IsNumber()
  y?: number;

  @ApiProperty({ description: 'Speed value', example: 0.616, required: false })
  @IsOptional()
  @IsNumber()
  speed?: number;
}

class UpdateSignalDataDto extends PartialType(SignalDataDto) { }

export class UpdateSignalDto {
  @ApiProperty({ description: 'The unique device ID', example: '968c4eb9-1a9a-44a5-a4be-277de049c5c6', required: false })
  @IsOptional()
  @IsUUID()
  deviceId?: string;

  @ApiProperty({ description: 'The timestamp when the data was received', example: 1739450223904, required: false })
  @IsOptional()
  @IsNumber()
  time?: number;

  @ApiProperty({ description: 'Total number of data points', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  dataLength?: number;

  @ApiProperty({ description: 'Sum of all speed values', example: 25.347, required: false })
  @IsOptional()
  @IsNumber()
  dataVolume?: number;

  @ApiProperty({ description: 'Array of x-ray data points', required: false })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateSignalDataDto)
  data?: UpdateSignalDataDto[];
}
