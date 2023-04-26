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
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTuningDto } from './dto/create-tuning.dto';
import { TuningService } from './tuning.service';
import { MyCarService } from 'src/mycar/mycar.service';
import { Tuning } from './schemas/tuning.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('tuning')
export class TuningController {
  constructor(
    private readonly tuningService: TuningService,
    private readonly myCarsService: MyCarService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  async create(
    @Req() req,
    @Body() createTuningDto: CreateTuningDto,
  ): Promise<Tuning> {
    const userId = req.user.id;
    const mycarId = createTuningDto.mycarId;
    if (await this.myCarsService.isUserRelatedToCar(userId, mycarId)) {
      return this.tuningService.create(createTuningDto);
    } else {
      throw new UnauthorizedException("You don't have access to this car.");
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() req, @Param('id') id: string): Promise<Tuning> {
    const user = req.user;
    if (!(await this.tuningService.isUserRelatedToTuning(user._id, id))) {
      throw new UnauthorizedException();
    }
    return this.tuningService.findOne(id);
  }

  @Get('mycar/:mycarId')
  async findAllByMyCarId(@Param('mycarId') mycarId: string): Promise<Tuning[]> {
    return this.tuningService.findAllByMyCarId(mycarId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateTuningDto: CreateTuningDto,
  ): Promise<void> {
    const userId = req.user.id;

    if (await this.tuningService.isUserRelatedToTuning(userId, id)) {
      await this.tuningService.update(id, updateTuningDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() req, @Param('id') id: string): Promise<void> {
    const user = req.user;
    if (await this.tuningService.isUserRelatedToTuning(user._id, id)) {
      throw new UnauthorizedException();
    } else {
    }
    await this.tuningService.delete(id);
  }
}
