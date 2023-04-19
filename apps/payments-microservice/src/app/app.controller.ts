import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { KafkaEvent, KafkaMessage } from '@nestjs-microservices/shared/communication';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(KafkaEvent.PROCESS_PAYMENT)
  handleProcessPayment(@Payload(ValidationPipe) data: MakePaymentDto) {
    this.appService.processPayment(data);
  }

  @MessagePattern(KafkaMessage.GET_PAYMENTS)
  handleGetUsers() {
    return this.appService.findAll();
  }
}
