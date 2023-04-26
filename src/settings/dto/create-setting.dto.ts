import { IsString, MinLength } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @MinLength(1)
  readonly mycarId: string;
  @IsString()
  @MinLength(1)
  readonly tireId: string;
  @IsString()
  @MinLength(1)
  readonly freeText: string;
}
