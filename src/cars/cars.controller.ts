import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
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

  @Get('/manufacturer/:manufacturerId')
  async findByManufacturer(
    @Param('manufacturerId') manufacturerId: string,
  ): Promise<Car[]> {
    return this.carsService.findByManufacturer(manufacturerId);
  }

  @Get('/driveTrain/:driveTrainId')
  async findByDraiveTrain(
    @Param('driveTrainId') driveTrainId: string,
  ): Promise<Car[]> {
    return this.carsService.findByDraiveTrain(driveTrainId);
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') carId: string, @Body() updateCarDto: CreateCarDto) {
    await this.carsService.update(carId, updateCarDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') carId: string) {
    await this.carsService.delete(carId);
  }
}
