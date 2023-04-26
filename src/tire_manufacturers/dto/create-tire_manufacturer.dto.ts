import { IsString, MinLength } from 'class-validator';

export class CreateTireManufacturerDto {
  @IsString()
  @MinLength(1)
  readonly name: string;
}
