import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISignal } from './signal.schema';
import { CreateSignalDto } from './DTO/create-signal.dto';
@Injectable()
export class SignalService {
  constructor(@InjectModel('Signal') private signalModel: Model<ISignal>,
  ) { }
  async create(createSignalDto: CreateSignalDto) {
    const signal = new this.signalModel(createSignalDto);
    await signal.save()
    return signal;
  }

}
