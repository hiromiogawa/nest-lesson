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
import { DriveTrainsService } from './drivetrains.service';
import { CreateDriveTrainDto } from './dto/create-drivetrain.dto';
import { DriveTrain } from './schemas/drivetrain.schema';

@Controller('drivetrains')
export class DriveTrainsController {
  constructor(private readonly DriveTrainsService: DriveTrainsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createDriveTrainDto: CreateDriveTrainDto,
  ): Promise<DriveTrain> {
    return this.DriveTrainsService.create(createDriveTrainDto);
  }

  @Get()
  async findAll(): Promise<DriveTrain[]> {
    return this.DriveTrainsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DriveTrain> {
    return this.DriveTrainsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() createDriveTrainDto: CreateDriveTrainDto,
  ) {
    await this.DriveTrainsService.update(id, createDriveTrainDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.DriveTrainsService.delete(id);
  }
}
