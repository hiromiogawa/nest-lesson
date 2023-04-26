// tuning.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTuningDto } from './dto/create-tuning.dto';
import { TuningService } from './tuning.service';
import { Tuning } from './schemas/tuning.schema';

@Controller('tuning')
export class TuningController {
  constructor(private readonly tuningService: TuningService) {}

  @Post()
  async create(@Body() createTuningDto: CreateTuningDto): Promise<Tuning> {
    return this.tuningService.create(createTuningDto);
  }

  @Get()
  async findAll(): Promise<Tuning[]> {
    return this.tuningService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tuning> {
    return this.tuningService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTuningDto: CreateTuningDto,
  ): Promise<Tuning> {
    return this.tuningService.update(id, updateTuningDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Tuning> {
    return this.tuningService.delete(id);
  }
}
