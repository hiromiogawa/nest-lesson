import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCircuitDto, UpdateCircuitDto } from './dto/create-circuit.dto';
import { Circuit, CircuitDocument } from './schemas/circuit.schema';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectModel(Circuit.name)
    private readonly circuitModel: Model<CircuitDocument>,
  ) {}

  async create(createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    const createdCircuit = new this.circuitModel(createCircuitDto);
    return createdCircuit.save();
  }

  async findAll(): Promise<Circuit[]> {
    return this.circuitModel.find().exec();
  }

  async findOne(id: string): Promise<Circuit> {
    return this.circuitModel.findById(id).exec();
  }

  async update(id: string, updateCircuitDto: UpdateCircuitDto): Promise<void> {
    const updatedCircuit = await this.circuitModel
      .findByIdAndUpdate(id, updateCircuitDto, { new: true })
      .exec();
    if (!updatedCircuit) {
      throw new NotFoundException('Could not find circuit');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedCircuit = await this.circuitModel.findByIdAndDelete(id).exec();
    if (!deletedCircuit) {
      throw new NotFoundException('Could not find circuit');
    }
  }
}
