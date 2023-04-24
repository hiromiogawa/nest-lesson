// cars.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/car.schema';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MakersModule } from '../makers/makers.module';
import { DriveTrainsModule } from '../drivetrains/drivetrains.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    MakersModule,
    DriveTrainsModule,
  ],
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService, MongooseModule],
})
export class CarsModule {}
