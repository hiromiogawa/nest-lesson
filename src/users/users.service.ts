import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Car } from '../cars/schemas/car.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel(Car.name) private carModel: Model<Car>,
  ) {}
  users: CreateUserDto[] = [];
  async create(user: CreateUserDto) {
    // パスワードをハッシュ化 第2引数はソルト
    const hashedPassword = await hash(user.password, 10);

    const createdUser = new this.userModel({
      username: user.username,
      password: hashedPassword,
      email: user.email,
    });

    return await createdUser.save();
  }

  async addCarToUser(userId: string, carId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const car = await this.carModel.findById(carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    user.mycars.push({ name: car.name, modelName: car.modelName });
    await user.save();

    return user;
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async update(username: string, password: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ username }, { password })
      .exec();
  }

  // Update username
  async updateUsername(email: string, newUsername: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ email }, { username: newUsername })
      .exec();
  }

  // Update password
  async updatePassword(email: string, newPassword: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ email }, { password: newPassword })
      .exec();
  }

  // Update email
  async updateEmail(oldEmail: string, newEmail: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ email: oldEmail }, { email: newEmail })
      .exec();
  }

  async delete(username: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ username }).exec();
  }
}
