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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 新規登録
  @Post()
  async create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return await this.usersService.create(createUser);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  // Update username
  @Put('/update-name/:email')
  async updateUsername(
    @Param('email') email: string,
    @Body('username') newUsername: string,
  ): Promise<User> {
    return await this.usersService.updateUsername(email, newUsername);
  }

  // Update password
  @Put('/update-password/:email')
  async updatePassword(
    @Param('email') email: string,
    @Body('password') newPassword: string,
  ): Promise<User> {
    return await this.usersService.updatePassword(email, newPassword);
  }

  // Update email
  @Put('/update-email/:email')
  async updateEmail(
    @Param('email') oldEmail: string,
    @Body('email') newEmail: string,
  ): Promise<User> {
    return await this.usersService.updateEmail(oldEmail, newEmail);
  }

  @Delete(':username')
  async delete(@Param('username') username: string) {
    return await this.usersService.delete(username);
  }
}
