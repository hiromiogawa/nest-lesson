import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { MyCarService } from 'src/mycar/mycar.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './schemas/setting.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly myCarsService: MyCarService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  async create(
    @Req() req,
    @Body() createSettingDto: CreateSettingDto,
  ): Promise<Setting> {
    const userId = req.user.id;
    const mycarId = createSettingDto.mycarId;
    if (await this.myCarsService.isUserRelatedToMyCar(userId, mycarId)) {
      return this.settingsService.create(createSettingDto);
    } else {
      throw new UnauthorizedException("You don't have access to this car.");
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Setting> {
    return this.settingsService.findOne(id);
  }

  @Get('mycar/:mycarId')
  async findAllByMyCarId(
    @Param('mycarId') mycarId: string,
  ): Promise<Setting[]> {
    return this.settingsService.findAllByMyCarId(mycarId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateSettingDto: CreateSettingDto,
  ): Promise<void> {
    const userId = req.user.id;
    if (await this.settingsService.isUserRelatedToSetting(userId, id)) {
      await this.settingsService.update(id, updateSettingDto);
    } else {
      throw new UnauthorizedException("You don't have access to this setting.");
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() req, @Param('id') id: string): Promise<void> {
    const userId = req.user.id;
    if (await this.settingsService.isUserRelatedToSetting(userId, id)) {
      await this.settingsService.delete(id);
    } else {
      throw new UnauthorizedException("You don't have access to this setting.");
    }
  }
}
