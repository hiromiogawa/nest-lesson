// Tires/Tires.controller.ts
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
import { TiresService } from './tire_manufacturers.service';
import { CreateTireDto } from './dto/create-tire.dto';
import { Tire } from './schemas/tire.schema';

@Controller('Tires')
export class TiresController {
  constructor(private readonly TiresService: TiresService) {}

  @Post()
  async create(@Body() createTire: CreateTireDto): Promise<Tire> {
    return this.TiresService.create(createTire);
  }

  @Get()
  async findAll(): Promise<Tire[]> {
    return this.TiresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tire> {
    return this.TiresService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') id: string, @Body() createTire: CreateTireDto) {
    await this.TiresService.update(id, createTire);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.TiresService.delete(id);
  }
}
