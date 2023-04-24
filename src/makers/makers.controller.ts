// makers/makers.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MakersService } from './makers.service';
import { CreateMakerDto } from './dto/create-maker.dto';
import { Maker } from './schemas/maker.schema';

@Controller('makers')
export class MakersController {
  constructor(private readonly makersService: MakersService) {}

  @Post()
  async create(@Body() createMakerDto: CreateMakerDto): Promise<Maker> {
    return this.makersService.create(createMakerDto);
  }

  @Get()
  async findAll(): Promise<Maker[]> {
    return this.makersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Maker> {
    return this.makersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createMakerDto: CreateMakerDto,
  ): Promise<Maker> {
    return this.makersService.update(id, createMakerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Maker> {
    return this.makersService.delete(id);
  }
}
