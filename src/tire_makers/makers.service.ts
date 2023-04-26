// makers/makers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maker, MakerDocument } from './schemas/maker.schema';
import { CreateMakerDto } from './dto/create-maker.dto';

@Injectable()
export class MakersService {
  constructor(
    @InjectModel(Maker.name) private readonly makerModel: Model<MakerDocument>,
  ) {}

  async create(createMakerDto: CreateMakerDto): Promise<Maker> {
    const createdMaker = new this.makerModel(createMakerDto);
    return createdMaker.save();
  }

  async findAll(): Promise<Maker[]> {
    return this.makerModel.find().exec();
  }

  async findOne(id: string): Promise<Maker> {
    return this.makerModel.findById(id).exec();
  }

  async update(id: string, createMakerDto: CreateMakerDto): Promise<void> {
    const updatedMaker = await this.makerModel
      .findByIdAndUpdate(id, createMakerDto, { new: true })
      .exec();
    if (!updatedMaker) {
      throw new NotFoundException('Could not find maker');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedMaker = await this.makerModel.findByIdAndDelete(id).exec();
    if (!deletedMaker) {
      throw new NotFoundException('Could not find maker');
    }
  }
}
