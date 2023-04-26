import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TireManufacturer,
  TireManufacturerSchema,
} from './schemas/tire_manufacturer.schema';
import { TireManufacturersService } from './tire_manufacturers.service';
import { TireManufacturersController } from './tire_manufacturers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TireManufacturer.name, schema: TireManufacturerSchema },
    ]),
  ],
  providers: [TireManufacturersService],
  controllers: [TireManufacturersController],
  exports: [TireManufacturersService, MongooseModule],
})
export class TireManufacturersModule {}
