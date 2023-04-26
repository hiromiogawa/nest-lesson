// TireManufacturers/TireManufacturers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TireManufacturer,
  TireManufacturerDocument,
} from './schemas/tire_manufacturer.schema';
import { CreateTireManufacturerDto } from './dto/create-tire_manufacturer.dto';

@Injectable()
export class TireManufacturersService {
  constructor(
    @InjectModel(TireManufacturer.name)
    private readonly TireManufacturerModel: Model<TireManufacturerDocument>,
  ) {}

  async create(
    createTireManufacturerDto: CreateTireManufacturerDto,
  ): Promise<TireManufacturer> {
    const createdTireManufacturer = new this.TireManufacturerModel(
      createTireManufacturerDto,
    );
    return createdTireManufacturer.save();
  }

  async findAll(): Promise<TireManufacturer[]> {
    return this.TireManufacturerModel.find().exec();
  }

  async findOne(id: string): Promise<TireManufacturer> {
    return this.TireManufacturerModel.findById(id).exec();
  }

  async update(
    id: string,
    createTireManufacturerDto: CreateTireManufacturerDto,
  ): Promise<void> {
    const updatedTireManufacturer =
      await this.TireManufacturerModel.findByIdAndUpdate(
        id,
        createTireManufacturerDto,
        { new: true },
      ).exec();
    if (!updatedTireManufacturer) {
      throw new NotFoundException('Could not find TireManufacturer');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedTireManufacturer =
      await this.TireManufacturerModel.findByIdAndDelete(id).exec();
    if (!deletedTireManufacturer) {
      throw new NotFoundException('Could not find TireManufacturer');
    }
  }
}
