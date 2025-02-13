import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerService } from './logger.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = app.get(WinstonLoggerService);
  logger.log('🚀 Application started');
}
bootstrap();