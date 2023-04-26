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
import { TireManufacturersService } from './tire_manufacturers.service';
import { CreateTireManufacturerDto } from './dto/create-tire_manufacturer.dto';
import { TireManufacturer } from './schemas/tire_manufacturer.schema';

@Controller('tire_manufacturers')
export class TireManufacturersController {
  constructor(
    private readonly TireManufacturersService: TireManufacturersService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createTireManufacturerDto: CreateTireManufacturerDto,
  ): Promise<TireManufacturer> {
    return this.TireManufacturersService.create(createTireManufacturerDto);
  }

  @Get()
  async findAll(): Promise<TireManufacturer[]> {
    return this.TireManufacturersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TireManufacturer> {
    return this.TireManufacturersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() createTireManufacturerDto: CreateTireManufacturerDto,
  ) {
    await this.TireManufacturersService.update(id, createTireManufacturerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.TireManufacturersService.delete(id);
  }
}
