// makers/makers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriveTrain, DriveTrainDocument } from './schemas/drivetrain.schema';
import { CreateDriveTrainDto } from './dto/create-drivetrain.dto';

@Injectable()
export class DriveTrainsService {
  constructor(
    @InjectModel(DriveTrain.name)
    private readonly driveTrainModel: Model<DriveTrainDocument>,
  ) {}

  async create(createDriveTrainDto: CreateDriveTrainDto): Promise<DriveTrain> {
    const createdMaker = new this.driveTrainModel(createDriveTrainDto);
    return createdMaker.save();
  }

  async findAll(): Promise<DriveTrain[]> {
    return this.driveTrainModel.find().exec();
  }

  async findOne(id: string): Promise<DriveTrain> {
    return this.driveTrainModel.findById(id).exec();
  }

  async update(
    id: string,
    createDriveTrainDto: CreateDriveTrainDto,
  ): Promise<void> {
    const updatedDriveTrain = await this.driveTrainModel
      .findByIdAndUpdate(id, createDriveTrainDto, { new: true })
      .exec();
    if (!updatedDriveTrain) {
      throw new NotFoundException('Could not find drive train');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedDriveTrain = await this.driveTrainModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedDriveTrain) {
      throw new NotFoundException('Could not find drive train');
    }
  }
}
