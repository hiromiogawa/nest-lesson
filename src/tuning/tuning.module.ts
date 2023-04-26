// tuning.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tuning, TuningSchema } from './schemas/tuning.schema';
import { TuningController } from './tuning.controller';
import { TuningService } from './tuning.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tuning.name, schema: TuningSchema }]),
  ],
  controllers: [TuningController],
  providers: [TuningService],
  exports: [TuningService],
})
export class TuningModule {}
