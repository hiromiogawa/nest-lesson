// cars.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { Manufacturer } from '../manufacturers/schemas/manufacturer.schema';
import { DriveTrain } from '../drivetrains/schemas/drivetrain.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(Manufacturer.name)
    private readonly ManufacturerModel: Model<Manufacturer>,
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

  async update(carId: string, updateCarDto: CreateCarDto): Promise<void> {
    const updatedCar = await this.carModel.findByIdAndUpdate(
      carId,
      updateCarDto,
      { new: true },
    );
    if (!updatedCar) {
      throw new NotFoundException('Car not found');
    }
  }

  async delete(carId: string): Promise<void> {
    const deletedCar = await this.carModel.findByIdAndDelete(carId).exec();
    if (!deletedCar) {
      throw new NotFoundException('Car not found');
    }
  }

  // メーカーから絞り込み
  async findByManufacturer(manufacturerId: string): Promise<Car[]> {
    const Manufacturer = await this.ManufacturerModel.findById(
      manufacturerId,
    ).exec();
    if (!Manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }
    return this.carModel.find({ manufacturer: manufacturerId }).exec();
  }

  // 駆動方式から絞り込み※使わないかも
  async findByDraiveTrain(driveTrainId: string): Promise<Car[]> {
    const driveTrain = await this.driveTrainModel.findById(driveTrainId).exec();
    if (!driveTrain) {
      throw new NotFoundException('Manufacturer not found');
    }
    return this.carModel.find({ driveTrain: driveTrainId }).exec();
  }
}
