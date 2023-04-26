// Manufacturers/Manufacturers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Manufacturer,
  ManufacturerDocument,
} from './schemas/manufacturer.schema';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectModel(Manufacturer.name)
    private readonly ManufacturerModel: Model<ManufacturerDocument>,
  ) {}

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const createdManufacturer = new this.ManufacturerModel(
      createManufacturerDto,
    );
    return createdManufacturer.save();
  }

  async findAll(): Promise<Manufacturer[]> {
    return this.ManufacturerModel.find().exec();
  }

  async findOne(id: string): Promise<Manufacturer> {
    return this.ManufacturerModel.findById(id).exec();
  }

  async update(
    id: string,
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<void> {
    const updatedManufacturer = await this.ManufacturerModel.findByIdAndUpdate(
      id,
      createManufacturerDto,
      { new: true },
    ).exec();
    if (!updatedManufacturer) {
      throw new NotFoundException('Could not find Manufacturer');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedManufacturer = await this.ManufacturerModel.findByIdAndDelete(
      id,
    ).exec();
    if (!deletedManufacturer) {
      throw new NotFoundException('Could not find Manufacturer');
    }
  }
}
