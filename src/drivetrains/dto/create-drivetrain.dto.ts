import { IsString, MinLength } from 'class-validator';

export class CreateDriveTrainDto {
  @IsString()
  @MinLength(1)
  readonly system: string;
}
