import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TireManufacture,
  TireManufactureSchema,
} from './schemas/tire_manufacture.schema';
import { TireManufacturesService } from './tire_manufactures.service';
import { TireManufacturesController } from './tire_manufactures.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TireManufacture.name, schema: TireManufactureSchema },
    ]),
  ],
  providers: [TireManufacturesService],
  controllers: [TireManufacturesController],
  exports: [TireManufacturesService, MongooseModule],
})
export class TireManufacturesModule {}
