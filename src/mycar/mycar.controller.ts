import { Controller, Get, Post, Body } from '@nestjs/common';
import { MyCarService } from './mycar.service';
import { CreateMyCarDto } from './dto/create-mycar.dto';
import { MyCar } from './schemas/mycar.schema';

@Controller('mycar')
export class MyCarController {
  constructor(private readonly myCarService: MyCarService) {}

  @Post()
  async create(@Body() createMyCarDto: CreateMyCarDto): Promise<MyCar> {
    return this.myCarService.create(createMyCarDto);
  }

  @Get()
  async findAll(): Promise<MyCar[]> {
    return this.myCarService.findAll();
  }
}
