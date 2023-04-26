import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './schemas/setting.schema';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async create(@Body() createSettingDto: CreateSettingDto): Promise<Setting> {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  async findAll(): Promise<Setting[]> {
    return this.settingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Setting> {
    return this.settingsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: CreateSettingDto,
  ): Promise<void> {
    await this.settingsService.update(id, updateSettingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.settingsService.delete(id);
  }
}
