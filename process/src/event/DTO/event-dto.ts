import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class EventDto {
    @ApiProperty({
        description: 'The name of the event',
        example: 'temperature',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The value associated with the event',
        example: 3,
    })
    @IsNumber()
    value: number;

    @ApiProperty({
        description: 'The unique identifier of the agent related to the event',
        example: 'test1',
    })
    @IsString()
    agentId: string;

    @ApiProperty({
        description: 'The timestamp when the event occurred',
        example: '2025-02-07T18:36:51.191Z',
    })
    @IsDate()
    timestamp: Date;

    @ApiProperty({
        description: 'The unique identifier for the event (MongoDB ObjectId)',
        example: '67a652c3458d0c22f0fdea18',
    })
    @IsOptional()
    @IsString()
    _id?: string | any;

    @ApiProperty({
        description: 'The timestamp when the event was created in the database',
        example: '2025-02-07T18:36:51.196Z',
    })
    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @ApiProperty({
        description: 'The timestamp when the event was last updated in the database',
        example: '2025-02-07T18:36:51.196Z',
    })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}
