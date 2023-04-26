import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MyCarService } from './mycar.service';
import { CreateMyCarDto } from './dto/create-mycar.dto';
import { MyCar } from './schemas/mycar.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('mycar')
export class MyCarController {
  constructor(private readonly myCarService: MyCarService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() req,
    @Body() createMyCarDto: CreateMyCarDto,
  ): Promise<MyCar> {
    const userId = req.user.id;
    createMyCarDto.userId = userId;
    return this.myCarService.create(createMyCarDto);
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  async findMyCars(@Req() req): Promise<MyCar[]> {
    const userId = req.user.id;
    return this.myCarService.findByUserId(userId);
  }

  @Get('user/:id')
  async findByUserId(@Param('id') userId: string): Promise<MyCar[]> {
    return this.myCarService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MyCar> {
    return this.myCarService.findOne(id);
  }
}
