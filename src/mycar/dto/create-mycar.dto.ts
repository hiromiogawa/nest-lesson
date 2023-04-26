import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateMyCarDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  carId: string;
}
