// cars.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { Maker } from '../makers/schemas/maker.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(Maker.name) private readonly makerModel: Model<Maker>,
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

  async findByMaker(makerId: string): Promise<Car[]> {
    const maker = await this.makerModel.findById(makerId).exec();
    if (!maker) {
      throw new NotFoundException('Maker not found');
    }
    return this.carModel.find({ maker: makerId }).exec();
  }
}
