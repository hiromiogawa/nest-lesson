import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';
import { CreateSettingDto } from './dto/create-setting.dto';
import { MyCar, MyCarDocument } from '../mycar/schemas/mycar.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
    @InjectModel(MyCar.name)
    private readonly mycarModel: Model<MyCarDocument>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const createdSetting = new this.settingModel(createSettingDto);
    return createdSetting.save();
  }

  async findAllByMyCarId(mycarId: string): Promise<Setting[]> {
    return await this.settingModel.find({ mycarId }).exec();
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

  async isUserRelatedToSetting(
    userId: string,
    settingId: string,
  ): Promise<boolean> {
    const setting = await this.settingModel.findById(settingId).exec();
    const mycar = await this.mycarModel
      .findOne({ userId, _id: setting.mycarId })
      .exec();
    return !!mycar;
  }
}
