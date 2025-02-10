import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('🚀 Application started');
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();