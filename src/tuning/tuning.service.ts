// tuning.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTuningDto } from './dto/create-tuning.dto';
import { Tuning, TuningDocument } from './schemas/tuning.schema';
import { MyCar, MyCarDocument } from '../mycar/schemas/mycar.schema';

@Injectable()
export class TuningService {
  constructor(
    @InjectModel(Tuning.name) private tuningModel: Model<TuningDocument>,
    @InjectModel(MyCar.name) private mycarModel: Model<MyCarDocument>,
  ) {}

  async create(createTuningDto: CreateTuningDto): Promise<Tuning> {
    const createdTuning = new this.tuningModel(createTuningDto);
    return createdTuning.save();
  }

  async findAllByMyCarId(mycarId: string): Promise<Tuning[]> {
    return await this.tuningModel.find({ mycarId }).exec();
  }

  async findOne(id: string): Promise<Tuning> {
    return this.tuningModel.findById(id).exec();
  }

  async update(id: string, updateTuningDto: CreateTuningDto): Promise<void> {
    await this.tuningModel.findByIdAndUpdate(id, updateTuningDto).exec();
  }

  async delete(id: string): Promise<void> {
    await this.tuningModel.findByIdAndDelete(id).exec();
  }

  async isUserRelatedToTuning(
    userId: string,
    tuningId: string,
  ): Promise<boolean> {
    const tuning = await this.tuningModel.findById(tuningId).exec();
    const mycar = await this.mycarModel
      .findOne({ userId, _id: tuning.mycarId })
      .exec();
    return !!mycar;
  }
}
