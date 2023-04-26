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
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

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
  async updateUsername(
    @Req() req,
    @Body('username') newUsername: string,
  ): Promise<User> {
    const userId = req.user.id;
    return await this.usersService.updateUsername(userId, newUsername);
  }

  // Update password
  @Put('/update-password')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @Req() req,
    @Body('password') newPassword: string,
  ): Promise<User> {
    const userId = req.user.id;
    return await this.usersService.updatePassword(userId, newPassword);
  }

  // Update email
  @Put('/update-email')
  @UseGuards(AuthGuard('jwt'))
  async updateEmail(
    @Req() req,
    @Body('email') newEmail: string,
  ): Promise<User> {
    const userId = req.user.id;
    return await this.usersService.updateEmail(userId, newEmail);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req) {
    const userId = req.user.id;
    return await this.usersService.delete(userId);
  }
}
