import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tire, TireDocument } from './schemas/tire.schema';
import { CreateTireDto } from './dto/create-tire.dto';

@Injectable()
export class TiresService {
  constructor(
    @InjectModel(Tire.name) private readonly tireModel: Model<TireDocument>,
  ) {}

  async create(createTireDto: CreateTireDto): Promise<Tire> {
    const createdTire = new this.tireModel(createTireDto);
    return createdTire.save();
  }

  async findAll(): Promise<Tire[]> {
    return this.tireModel.find().exec();
  }

  async findOne(id: string): Promise<Tire> {
    const tire = await this.tireModel.findById(id).exec();
    if (!tire) {
      throw new NotFoundException('Tire not found');
    }
    return tire;
  }

  async update(id: string, updateTireDto: CreateTireDto): Promise<void> {
    const updatedTire = await this.tireModel
      .findByIdAndUpdate(id, updateTireDto)
      .exec();
    if (!updatedTire) {
      throw new NotFoundException('Tire not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedTire = await this.tireModel.findByIdAndDelete(id).exec();
    if (!deletedTire) {
      throw new NotFoundException('Tire not found');
    }
  }
}
