import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Post(':userId/add-car/:carId')
  @UseGuards(AuthGuard('jwt'))
  async addCarToUser(
    @Param('userId') userId: string,
    @Param('carId') carId: string,
  ): Promise<User> {
    return this.usersService.addCarToUser(userId, carId);
  }

  @Post(':userId/remove-car/:carId')
  @UseGuards(AuthGuard('jwt'))
  async removeCarFromUser(
    @Param('userId') userId: string,
    @Param('carId') carId: Types.ObjectId,
  ): Promise<User> {
    return this.usersService.removeCarFromUser(userId, carId);
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
  @Put('/update-name/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUsername(
    @Param('id') _id: string,
    @Body('username') newUsername: string,
  ): Promise<User> {
    return await this.usersService.updateUsername(_id, newUsername);
  }

  // Update password
  @Put('/update-password/:id')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @Param('id') _id: string,
    @Body('password') newPassword: string,
  ): Promise<User> {
    return await this.usersService.updatePassword(_id, newPassword);
  }

  // Update email
  @Put('/update-email/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateEmail(
    @Param('id') _id: string,
    @Body('email') newEmail: string,
  ): Promise<User> {
    return await this.usersService.updateEmail(_id, newEmail);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') _id: string) {
    return await this.usersService.delete(_id);
  }
}
