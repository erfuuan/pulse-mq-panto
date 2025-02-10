import { Module } from '@nestjs/common';
import { EventModule } from './events/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    EventModule,
  ],
})
export class AppModule { }
