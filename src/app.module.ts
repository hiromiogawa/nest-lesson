import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { MakersModule } from './makers/makers.module';
import { DriveTrainsModule } from './drivetrains/drivetrains.module';

@Module({
  imports: [
    UsersModule,
    // データベースのパス
    MongooseModule.forRoot('mongodb://localhost/nest-lesson'),
    AuthModule,
    CarsModule,
    MakersModule,
    DriveTrainsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
