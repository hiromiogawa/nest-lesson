// Manufactures/Manufactures.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manufacture, ManufactureDocument } from './schemas/manufacture.schema';
import { CreateManufactureDto } from './dto/create-manufacture.dto';

@Injectable()
export class ManufacturesService {
  constructor(
    @InjectModel(Manufacture.name)
    private readonly ManufactureModel: Model<ManufactureDocument>,
  ) {}

  async create(
    createManufactureDto: CreateManufactureDto,
  ): Promise<Manufacture> {
    const createdManufacture = new this.ManufactureModel(createManufactureDto);
    return createdManufacture.save();
  }

  async findAll(): Promise<Manufacture[]> {
    return this.ManufactureModel.find().exec();
  }

  async findOne(id: string): Promise<Manufacture> {
    return this.ManufactureModel.findById(id).exec();
  }

  async update(
    id: string,
    createManufactureDto: CreateManufactureDto,
  ): Promise<void> {
    const updatedManufacture = await this.ManufactureModel.findByIdAndUpdate(
      id,
      createManufactureDto,
      { new: true },
    ).exec();
    if (!updatedManufacture) {
      throw new NotFoundException('Could not find Manufacture');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedManufacture = await this.ManufactureModel.findByIdAndDelete(
      id,
    ).exec();
    if (!deletedManufacture) {
      throw new NotFoundException('Could not find Manufacture');
    }
  }
}
