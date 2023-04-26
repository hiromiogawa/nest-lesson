import { TireManufacturer } from '../../tire_manufacturers/schemas/tire_manufacturer.schema';

export class CreateTireDto {
  readonly name: string;
  readonly manufacturer: TireManufacturer;
}
