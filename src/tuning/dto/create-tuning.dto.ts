import { MyCar } from '../../mycar/schemas/mycar.schema';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTuningDto {
  @MinLength(1)
  @MaxLength(20)
  @IsString()
  readonly mycarId: MyCar;

  @MinLength(1)
  readonly freeText: string;
}
