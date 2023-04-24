import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: CreateUserDto) {
    // ユーザーを検索 (emailで検索)
    const foundUser = await this.usersService.findByEmail(user.email);

    // ユーザーが存在し、パスワードが一致する場合
    if (foundUser && (await compare(user.password, foundUser.password))) {
      const payload = { username: foundUser.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      // ユーザーが存在しないか、パスワードが一致しない場合はエラーをスロー
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
