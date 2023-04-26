// tuning.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTuningDto } from './dto/create-tuning.dto';
import { Tuning, TuningDocument } from './schemas/tuning.schema';

@Injectable()
export class TuningService {
  constructor(
    @InjectModel(Tuning.name) private tuningModel: Model<TuningDocument>,
  ) {}

  async create(createTuningDto: CreateTuningDto): Promise<Tuning> {
    const createdTuning = new this.tuningModel(createTuningDto);
    return createdTuning.save();
  }

  async findAll(): Promise<Tuning[]> {
    return this.tuningModel.find().exec();
  }

  async findOne(id: string): Promise<Tuning> {
    return this.tuningModel.findById(id).exec();
  }

  async update(id: string, updateTuningDto: CreateTuningDto): Promise<Tuning> {
    return this.tuningModel
      .findByIdAndUpdate(id, updateTuningDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Tuning> {
    return this.tuningModel.findByIdAndDelete(id).exec();
  }
}
