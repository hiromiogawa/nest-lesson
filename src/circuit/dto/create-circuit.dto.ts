import { IsString, MinLength, IsNumber } from 'class-validator';

export class CreateCircuitDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  location: string;
  @IsNumber()
  @MinLength(1)
  distance: number;
  @IsString()
  @MinLength(1)
  layoutImageUrl: string;
}

export class UpdateCircuitDto {
  @IsString()
  name?: string;
  @IsString()
  location?: string;
  @IsNumber()
  distance?: number;
  @IsString()
  layoutImageUrl?: string;
}
