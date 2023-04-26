import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMyCarDto } from './dto/create-mycar.dto';
import { MyCar, MyCarDocument } from './schemas/mycar.schema';

@Injectable()
export class MyCarService {
  constructor(
    @InjectModel(MyCar.name) private myCarModel: Model<MyCarDocument>,
  ) {}

  async create(createMyCarDto: CreateMyCarDto): Promise<MyCar> {
    const newMyCar = new this.myCarModel(createMyCarDto);
    return newMyCar.save();
  }

  async findByUserId(userId: string): Promise<MyCar[]> {
    return this.myCarModel
      .find({ userId })
      .populate({ path: 'carId' })
      .populate({ path: 'userId' })
      .exec();
  }

  async findOne(id: string): Promise<MyCar> {
    return this.myCarModel.findById(id).exec();
  }
}
