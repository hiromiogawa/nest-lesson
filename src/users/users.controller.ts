import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  ValidationPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 新規登録
  @Post()
  async create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return await this.usersService.create(createUser);
  }

  // このまま使うのはまずいパスワード丸見え
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') _id: string) {
    return await this.usersService.findOne(_id);
  }

  // Update username
  @Put('/update-name')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204) // 追加
  async updateUsername(@Req() req, @Body('username') newUsername: string) {
    const userId = req.user.id;
    await this.usersService.updateUsername(userId, newUsername);
  }

  // Update password
  @Put('/update-password')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204) // 追加
  async updatePassword(@Req() req, @Body('password') newPassword: string) {
    const userId = req.user.id;
    await this.usersService.updatePassword(userId, newPassword);
  }

  // Update email
  @Put('/update-email')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204) // 追加
  async updateEmail(@Req() req, @Body('email') newEmail: string) {
    const userId = req.user.id;
    await this.usersService.updateEmail(userId, newEmail);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204) // 追加
  async delete(@Req() req) {
    const userId = req.user.id;
    await this.usersService.delete(userId);
  }
}
