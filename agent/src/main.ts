import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AgentService } from './agent.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const agentService = app.get(AgentService);
  setInterval(() => {
    agentService.sendEvent();
  }, 200);
}
bootstrap();

