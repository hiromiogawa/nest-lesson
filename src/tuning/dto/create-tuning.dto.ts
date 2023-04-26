import { MyCar } from '../../mycar/schemas/mycar.schema';

export class CreateTuningDto {
  readonly mycarId: MyCar;
  readonly modification: string;
  readonly partName: string;
  readonly effect: string;
}
