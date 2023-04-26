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
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './schemas/manufacturer.schema';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly ManufacturersService: ManufacturersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    return this.ManufacturersService.create(createManufacturerDto);
  }

  @Get()
  async findAll(): Promise<Manufacturer[]> {
    return this.ManufacturersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Manufacturer> {
    return this.ManufacturersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() createManufacturerDto: CreateManufacturerDto,
  ) {
    await this.ManufacturersService.update(id, createManufacturerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.ManufacturersService.delete(id);
  }
}
