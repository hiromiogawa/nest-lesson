import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
  @IsEmail()
  readonly email: string;
}
