import { TireManufacturer } from '../../tire_manufacturers/schemas/tire_manufacturer.schema';
import { IsString, MinLength } from 'class-validator';

export class CreateTireDto {
  @IsString()
  @MinLength(1)
  readonly name: string;
  @IsString()
  @MinLength(1)
  readonly manufacturer: TireManufacturer;
}
