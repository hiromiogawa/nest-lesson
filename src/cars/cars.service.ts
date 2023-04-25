// cars.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { Maker } from '../makers/schemas/maker.schema';
import { DriveTrain } from '../drivetrains/schemas/drivetrain.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(Maker.name) private readonly makerModel: Model<Maker>,
    @InjectModel(DriveTrain.name)
    private readonly driveTrainModel: Model<DriveTrain>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const createdCar = new this.carModel(createCarDto);
    return await createdCar.save();
  }

  async findAll(): Promise<Car[]> {
    return await this.carModel.find().exec();
  }

  async findOne(carId: string): Promise<Car> {
    const car = await this.carModel.findById(carId).exec();
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  async update(carId: string, updateCarDto: CreateCarDto): Promise<Car> {
    const updatedCar = await this.carModel.findByIdAndUpdate(
      carId,
      updateCarDto,
      { new: true },
    );
    if (!updatedCar) {
      throw new NotFoundException('Car not found');
    }
    return updatedCar;
  }

  async delete(carId: string): Promise<Car> {
    const deletedCar = await this.carModel.findByIdAndDelete(carId).exec();
    if (!deletedCar) {
      throw new NotFoundException('Car not found');
    }
    return deletedCar;
  }

  // メーカーから絞り込み
  async findByMaker(makerId: string): Promise<Car[]> {
    const maker = await this.makerModel.findById(makerId).exec();
    if (!maker) {
      throw new NotFoundException('Maker not found');
    }
    return this.carModel.find({ maker: makerId }).exec();
  }

  // 駆動方式から絞り込み
  async findByDraiveTrain(driveTrainId: string): Promise<Car[]> {
    const driveTrain = await this.driveTrainModel.findById(driveTrainId).exec();
    if (!driveTrain) {
      throw new NotFoundException('Maker not found');
    }
    return this.carModel.find({ driveTrain: driveTrainId }).exec();
  }
}
