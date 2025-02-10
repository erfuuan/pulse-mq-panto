import { Controller } from '@nestjs/common';
import { SignalService } from './signal.service';
@Controller('signals')
export class SignalController {
  constructor(private readonly signalService: SignalService) { }

}
