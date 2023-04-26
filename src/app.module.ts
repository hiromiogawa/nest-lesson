import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { TiresModule } from './tires/tires.module';
import { TireManufacturersModule } from './tire_manufacturers/tire_manufacturers.module';
import { CircuitsModule } from './circuit/circuits.module';
import { TuningModule } from './tuning/tuning.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    UsersModule,
    // データベースのパス
    MongooseModule.forRoot('mongodb://localhost/nest-lesson'),
    AuthModule,
    CarsModule,
    TiresModule,
    TireManufacturersModule,
    CircuitsModule,
    TuningModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
