import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DriveTrainsService } from './drivetrains.service';
import { CreateDriveTrainDto } from './dto/create-drivetrain.dto';
import { DriveTrain } from './schemas/drivetrain.schema';

@Controller('drivetrains')
export class DriveTrainsController {
  constructor(private readonly DriveTrainsService: DriveTrainsService) {}

  @Post()
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
  async update(
    @Param('id') id: string,
    @Body() createDriveTrainDto: CreateDriveTrainDto,
  ): Promise<DriveTrain> {
    return this.DriveTrainsService.update(id, createDriveTrainDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DriveTrain> {
    return this.DriveTrainsService.delete(id);
  }
}
