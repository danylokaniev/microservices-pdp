import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { KafkaEvent, PaymentMicroservice } from '@nestjs-microservices/shared/communication';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PaymentMicroservice.name) private readonly paymentClient: ClientKafka
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    this.paymentClient.emit(KafkaEvent.PROCESS_PAYMENT, JSON.stringify(makePaymentDto));
  }
}
