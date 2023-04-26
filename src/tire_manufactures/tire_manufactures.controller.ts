// TireManufactures/TireManufactures.controller.ts
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
import { TireManufacturesService } from './tire_manufactures.service';
import { CreateTireManufactureDto } from './dto/create-tire_manufacture.dto';
import { TireManufacture } from './schemas/tire_manufacture.schema';

@Controller('TireManufactures')
export class TireManufacturesController {
  constructor(
    private readonly TireManufacturesService: TireManufacturesService,
  ) {}

  @Post()
  async create(
    @Body() createTireManufactureDto: CreateTireManufactureDto,
  ): Promise<TireManufacture> {
    return this.TireManufacturesService.create(createTireManufactureDto);
  }

  @Get()
  async findAll(): Promise<TireManufacture[]> {
    return this.TireManufacturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TireManufacture> {
    return this.TireManufacturesService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() createTireManufactureDto: CreateTireManufactureDto,
  ) {
    await this.TireManufacturesService.update(id, createTireManufactureDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.TireManufacturesService.delete(id);
  }
}
