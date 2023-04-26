import { Module } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Circuit, CircuitSchema } from './schemas/circuit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Circuit.name, schema: CircuitSchema }]),
  ],
  providers: [CircuitsService],
  controllers: [CircuitsController],
})
export class CircuitsModule {}
