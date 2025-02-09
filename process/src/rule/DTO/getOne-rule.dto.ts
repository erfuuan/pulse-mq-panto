import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetOneDto {
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsMongoId({ message: 'ID must be a valid MongoDB ObjectId' })
  id: string;
}
