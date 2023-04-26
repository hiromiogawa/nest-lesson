// TireManufactures/TireManufactures.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TireManufacture,
  TireManufactureDocument,
} from './schemas/tire_manufacture.schema';
import { CreateTireManufactureDto } from './dto/create-tire_manufacture.dto';

@Injectable()
export class TireManufacturesService {
  constructor(
    @InjectModel(TireManufacture.name)
    private readonly TireManufactureModel: Model<TireManufactureDocument>,
  ) {}

  async create(
    createTireManufactureDto: CreateTireManufactureDto,
  ): Promise<TireManufacture> {
    const createdTireManufacture = new this.TireManufactureModel(
      createTireManufactureDto,
    );
    return createdTireManufacture.save();
  }

  async findAll(): Promise<TireManufacture[]> {
    return this.TireManufactureModel.find().exec();
  }

  async findOne(id: string): Promise<TireManufacture> {
    return this.TireManufactureModel.findById(id).exec();
  }

  async update(
    id: string,
    createTireManufactureDto: CreateTireManufactureDto,
  ): Promise<void> {
    const updatedTireManufacture =
      await this.TireManufactureModel.findByIdAndUpdate(
        id,
        createTireManufactureDto,
        { new: true },
      ).exec();
    if (!updatedTireManufacture) {
      throw new NotFoundException('Could not find TireManufacture');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedTireManufacture =
      await this.TireManufactureModel.findByIdAndDelete(id).exec();
    if (!deletedTireManufacture) {
      throw new NotFoundException('Could not find TireManufacture');
    }
  }
}
