import { Injectable } from '@nestjs/common';
import { CreateSignaConsumerlDto } from '../signals/DTO/create-signal-consumer.dto'
import { CreateSignalDto } from '../signals/DTO/create-signal.dto'
@Injectable()
export class RabbitMQService {
  constructor(
  ) { }

  async processXRayData(message: CreateSignaConsumerlDto): Promise<CreateSignalDto> {
    const { deviceId, data, time } = message;
    const dataLength = data.length;
    const dataVolume = data.reduce((acc, record) => acc + (Array.isArray(record[1]) ? record[1].length : 0), 0);
    const processedData = {
      deviceId,
      time,
      dataLength,
      dataVolume,
      data: data.map(([coordinates]) => ({
        x: coordinates[0],
        y: coordinates[1],
        speed: coordinates[2]
      }))
    };
    return processedData;

  }
}

