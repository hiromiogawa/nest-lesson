import { Module } from '@nestjs/common';
import { MyCarService } from './mycar.service';
import { MyCarController } from './mycar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MyCarSchema } from './schemas/mycar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MyCar', schema: MyCarSchema }]),
  ],
  providers: [MyCarService],
  controllers: [MyCarController],
  exports: [MyCarService, MongooseModule],
})
export class MyCarModule {}
