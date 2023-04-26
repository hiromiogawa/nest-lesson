import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMyCarDto } from './dto/create-mycar.dto';
import { MyCar } from './schemas/mycar.schema';

@Injectable()
export class MyCarService {
  constructor(@InjectModel('MyCar') private myCarModel: Model<MyCar>) {}

  async create(createMyCarDto: CreateMyCarDto): Promise<MyCar> {
    const createdMyCar = new this.myCarModel(createMyCarDto);
    return createdMyCar.save();
  }

  async findAll(): Promise<MyCar[]> {
    return this.myCarModel.find().exec();
  }
}
