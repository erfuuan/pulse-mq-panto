import { IsString, IsArray, IsNumber } from 'class-validator';

export class XrayDataDto {
  @IsString()
  deviceId: string;

  @IsArray()
  data: Array<[number, number[]]>;

  @IsNumber()
  time: number;
}