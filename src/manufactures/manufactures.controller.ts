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
import { ManufacturesService } from './manufactures.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { Manufacture } from './schemas/manufacture.schema';

@Controller('manufactures')
export class ManufacturesController {
  constructor(private readonly ManufacturesService: ManufacturesService) {}

  @Post()
  async create(
    @Body() createManufactureDto: CreateManufactureDto,
  ): Promise<Manufacture> {
    return this.ManufacturesService.create(createManufactureDto);
  }

  @Get()
  async findAll(): Promise<Manufacture[]> {
    return this.ManufacturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Manufacture> {
    return this.ManufacturesService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() createManufactureDto: CreateManufactureDto,
  ) {
    await this.ManufacturesService.update(id, createManufactureDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.ManufacturesService.delete(id);
  }
}
