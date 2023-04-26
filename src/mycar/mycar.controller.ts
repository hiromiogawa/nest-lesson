import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MyCarService } from './mycar.service';
import { CreateMyCarDto } from './dto/create-mycar.dto';
import { MyCar } from './schemas/mycar.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('mycar')
export class MyCarController {
  constructor(private readonly myCarService: MyCarService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() req,
    @Body() createMyCarDto: CreateMyCarDto,
  ): Promise<MyCar> {
    const userId = req.user.id;
    createMyCarDto.userId = userId;
    return this.myCarService.create(createMyCarDto);
  }

  @Get()
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

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateMyCarDto: CreateMyCarDto,
  ) {
    const userId = req.user.id;
    await this.myCarService.update(id, userId, updateMyCarDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async delete(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    await this.myCarService.delete(id, userId);
  }
}
