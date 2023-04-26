import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TiresService } from './tires.service';
import { Tire } from './schemas/tire.schema';
import { CreateTireDto } from './dto/create-tire.dto';

@Controller('tires')
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTireDto: CreateTireDto): Promise<Tire> {
    return this.tiresService.create(createTireDto);
  }

  @Get()
  async findAll(): Promise<Tire[]> {
    return this.tiresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tire> {
    return this.tiresService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateTireDto: CreateTireDto,
  ): Promise<void> {
    return this.tiresService.update(id, updateTireDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.tiresService.delete(id);
  }
}
