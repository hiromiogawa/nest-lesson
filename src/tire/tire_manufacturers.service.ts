// Tires/Tires.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tire, TireDocument } from './schemas/tire.schema';
import { CreateTireDto } from './dto/create-tire.dto';

@Injectable()
export class TiresService {
  constructor(
    @InjectModel(Tire.name)
    private readonly TireModel: Model<TireDocument>,
  ) {}

  async create(createTireDto: CreateTireDto): Promise<Tire> {
    const createdTire = new this.TireModel(createTireDto);
    return createdTire.save();
  }

  async findAll(): Promise<Tire[]> {
    return this.TireModel.find().exec();
  }

  async findOne(id: string): Promise<Tire> {
    return this.TireModel.findById(id).exec();
  }

  async update(id: string, createTireDto: CreateTireDto): Promise<void> {
    const updatedTire = await this.TireModel.findByIdAndUpdate(
      id,
      createTireDto,
      { new: true },
    ).exec();
    if (!updatedTire) {
      throw new NotFoundException('Could not find Tire');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedTire = await this.TireModel.findByIdAndDelete(id).exec();
    if (!deletedTire) {
      throw new NotFoundException('Could not find Tire');
    }
  }
}
