// tuning.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tuning, TuningSchema } from './schemas/tuning.schema';
import { TuningController } from './tuning.controller';
import { TuningService } from './tuning.service';
import { MyCarModule } from 'src/mycar/mycar.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tuning.name, schema: TuningSchema }]),
    MyCarModule,
  ],
  controllers: [TuningController],
  providers: [TuningService],
  exports: [TuningService],
})
export class TuningModule {}
