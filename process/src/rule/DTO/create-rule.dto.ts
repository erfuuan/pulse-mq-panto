import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Import Swagger decorators
export class CreateRuleDto {
  @ApiProperty({
    description: 'The operator for the rule',
    enum: ['<', '>', '==', '>=', '<='],
    example: '>',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['<', '>', '==', '>=', '<='], { message: 'Operator must be one of <, >, <=, >= or ==' })
  operator: string;

  @ApiProperty({
    description: 'The first operand for the rule',
    example: 'temperature',
    enum: ["temperature", "speed", "pressure", "voltage", "noise", "light_intensity"],
  })
  @IsNotEmpty()
  @IsIn(["temperature", "speed", "pressure", "voltage", "noise", "light_intensity"], { message: 'Operand1 must be one of temperature, speed, pressure, voltage, noise, or light_intensity' })
  operand1: string;

  @ApiProperty({
    description: 'The second operand for the rule',
    example: 100,
  })
  @IsNotEmpty()
  operand2: number;

  @ApiProperty({
    description: 'The name of the rule',
    example: 'High Temperature Rule',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
