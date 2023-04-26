// tuning.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateTuningDto: CreateTuningDto,
  ): Promise<void> {
    await this.tuningService.update(id, updateTuningDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.tuningService.delete(id);
  }
}
