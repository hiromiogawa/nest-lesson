import { IsString, MinLength } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @MinLength(1)
  readonly name: string;
}
