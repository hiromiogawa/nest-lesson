import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ password, email }: LoginUserDto) {
    // ユーザーを検索 (emailで検索)
    const foundUser = await this.usersService.findByEmail(email);
    // ユーザーが存在し、パスワードが一致する場合
    if (foundUser && (await compare(password, foundUser.password))) {
      return true;
    } else {
      false;
    }
  }
  async login(loginUser: LoginUserDto) {
    // ユーザーを検索 (emailで検索)
    const foundUser = await this.usersService.findByEmail(loginUser.email);

    // ユーザーが存在し、パスワードが一致する場合
    if (this.validateUser(loginUser)) {
      const payload = { id: foundUser._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      // ユーザーが存在しないか、パスワードが一致しない場合はエラーをスロー
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
