// mycar/dto/create-mycar.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMyCarDto {
  @IsNotEmpty()
  @IsString()
  carId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  userId: Types.ObjectId;
}
