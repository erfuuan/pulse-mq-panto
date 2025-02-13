import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { XrayDataDto } from './signal.dto';
import { faker } from '@faker-js/faker';
import { Interval } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class SignalService {
  constructor(
    @Inject('EVENT_PUBLISHER') private readonly client: ClientProxy,

  ) { }
  generateXrayData(): XrayDataDto {
    const deviceId = faker.string.uuid();
    const data: [number, number[]][] = [
      [
        faker.number.int({ min: 0, max: 50000 }),
        [
          parseFloat(faker.location.latitude({ min: 51.339, max: 51.341 }).toFixed(6)),
          parseFloat(faker.location.longitude({ min: 12.338, max: 12.340 }).toFixed(6)),
          parseFloat(faker.number.float({ min: 0.1, max: 3.5, fractionDigits: 4 }).toFixed(6)),
        ],
      ],
    ];
    const timestamp = Date.now();
    return { deviceId, data, time: timestamp };
  }
  @Interval(3000)
  async sendXraySignal() {
    const xrayData = this.generateXrayData();
    console.log('📤 X-ray Message Sent:', JSON.stringify(xrayData));
    this.client.emit('xray1', xrayData);
  }
}