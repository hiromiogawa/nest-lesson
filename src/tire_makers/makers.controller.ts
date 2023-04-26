// makers/makers.controller.ts
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
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() createMakerDto: CreateMakerDto,
  ) {
    await this.makersService.update(id, createMakerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.makersService.delete(id);
  }
}
