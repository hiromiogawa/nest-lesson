import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Manufacture, ManufactureSchema } from './schemas/manufacture.schema';
import { ManufacturesService } from './manufactures.service';
import { ManufacturesController } from './manufactures.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Manufacture.name, schema: ManufactureSchema },
    ]),
  ],
  providers: [ManufacturesService],
  controllers: [ManufacturesController],
  exports: [ManufacturesService, MongooseModule],
})
export class ManufacturesModule {}
