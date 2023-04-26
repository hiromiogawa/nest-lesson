import { MyCar } from '../../mycar/schemas/mycar.schema';

export class CreateTuningDto {
  readonly mycarId: MyCar;
  readonly freeText: string;
}
