import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tire, TireSchema } from './schemas/tire.schema';
import { TiresService } from './tire_manufacturers.service';
import { TiresController } from './tire_manufacturers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tire.name, schema: TireSchema }]),
  ],
  providers: [TiresService],
  controllers: [TiresController],
  exports: [TiresService, MongooseModule],
})
export class TiresModule {}
