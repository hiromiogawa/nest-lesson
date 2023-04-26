import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Car, CarDocument } from '../cars/schemas/car.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
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

    user.mycars.push(car._id.toString());
    await user.save();

    return user;
  }

  async removeCarFromUser(
    userId: string,
    carId: Types.ObjectId,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const carIndex = user.mycars.indexOf(carId);
    if (carIndex === -1) {
      throw new NotFoundException('Car not found in user mycars');
    }

    user.mycars.splice(carIndex, 1);
    await user.save();

    return user;
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(_id: string) {
    const user = await this.userModel
      .findById(_id)
      .populate({ path: 'mycars' })
      .exec();
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
  async updateUsername(_id: string, newUsername: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id }, { username: newUsername })
      .exec();
  }

  // Update password
  async updatePassword(_id: string, newPassword: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id }, { password: newPassword })
      .exec();
  }

  // Update email
  async updateEmail(_id: string, newEmail: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id }, { email: newEmail })
      .exec();
  }

  async delete(_id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id }).exec();
  }
}
