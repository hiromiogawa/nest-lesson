import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CreateCircuitDto, UpdateCircuitDto } from './dto/create-circuit.dto';
import { CircuitsService } from './circuits.service';
import { Circuit } from './schemas/circuit.schema';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    return this.circuitsService.create(createCircuitDto);
  }

  @Get()
  async findAll(): Promise<Circuit[]> {
    return this.circuitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Circuit> {
    return this.circuitsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateCircuitDto: UpdateCircuitDto,
  ) {
    await this.circuitsService.update(id, updateCircuitDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.circuitsService.delete(id);
  }
}
