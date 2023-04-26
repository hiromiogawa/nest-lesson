import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Maker, MakerSchema } from './schemas/maker.schema';
import { MakersService } from './makers.service';
import { MakersController } from './makers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Maker.name, schema: MakerSchema }]),
  ],
  providers: [MakersService],
  controllers: [MakersController],
  exports: [MakersService, MongooseModule],
})
export class MakersModule {}
