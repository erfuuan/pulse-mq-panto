import { ApiProperty } from '@nestjs/swagger';
import { Signal } from '../signal.schema';

export class PaginationDto {
    @ApiProperty({
        description: 'Total number of items available',
        example: 100,
        type: Number,
    })
    total: number;

    @ApiProperty({
        description: 'Current page number',
        example: 1,
        type: Number,
    })
    page: number;

    @ApiProperty({
        description: 'Number of items per page',
        example: 10,
        type: Number,
    })
    limit: number;

    @ApiProperty({
        description: 'Total number of pages available',
        example: 10,
        type: Number,
    })
    totalPages: number;
}



export class PaginatedSignalResponseDto {
    @ApiProperty({
        description: 'Pagination metadata for the response',
        type: PaginationDto,
    })
    meta: PaginationDto;

    @ApiProperty({
        description: 'List of signals for the current page',
        type: [Signal],
    })
    data: Signal[];
}
