import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCircuitDto, UpdateCircuitDto } from './dto/create-circuit.dto';
import { CircuitsService } from './circuits.service';
import { Circuit } from './schemas/circuit.schema';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
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
  async update(
    @Param('id') id: string,
    @Body() updateCircuitDto: UpdateCircuitDto,
  ): Promise<Circuit> {
    return this.circuitsService.update(id, updateCircuitDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Circuit> {
    return this.circuitsService.delete(id);
  }
}
