import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(201)
  async create(@Body(ValidationPipe) loginUser: LoginUserDto) {
    return await this.authService.login(loginUser);
  }
}
