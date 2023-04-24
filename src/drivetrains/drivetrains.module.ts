import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriveTrainsController } from './drivetrains.controller';
import { DriveTrainsService } from './drivetrains.service';
import { DriveTrain, DriveTrainSchema } from './schemas/drivetrain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DriveTrain.name, schema: DriveTrainSchema },
    ]),
  ],
  controllers: [DriveTrainsController],
  providers: [DriveTrainsService],
  exports: [DriveTrainsService, MongooseModule],
})
export class DriveTrainsModule {}
