import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') carId: string): Promise<Car> {
    return this.carsService.findOne(carId);
  }

  @Get('/maker/:makerId')
  async findByMaker(@Param('makerId') makerId: string): Promise<Car[]> {
    return this.carsService.findByMaker(makerId);
  }

  @Put(':id')
  async update(
    @Param('id') carId: string,
    @Body() updateCarDto: CreateCarDto,
  ): Promise<Car> {
    return this.carsService.update(carId, updateCarDto);
  }

  @Delete(':id')
  async delete(@Param('id') carId: string): Promise<Car> {
    return this.carsService.delete(carId);
  }
}
