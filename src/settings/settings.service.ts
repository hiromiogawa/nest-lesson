import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';
import { CreateSettingDto } from './dto/create-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const createdSetting = new this.settingModel(createSettingDto);
    return createdSetting.save();
  }

  async findAll(): Promise<Setting[]> {
    return this.settingModel.find().exec();
  }

  async findOne(id: string): Promise<Setting> {
    const setting = await this.settingModel.findById(id).exec();
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }
    return setting;
  }

  async update(id: string, updateSettingDto: CreateSettingDto): Promise<void> {
    const updatedSetting = await this.settingModel
      .findByIdAndUpdate(id, updateSettingDto)
      .exec();
    if (!updatedSetting) {
      throw new NotFoundException('Setting not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedSetting = await this.settingModel.findByIdAndDelete(id).exec();
    if (!deletedSetting) {
      throw new NotFoundException('Setting not found');
    }
  }
}
