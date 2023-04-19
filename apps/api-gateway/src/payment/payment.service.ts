import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { KafkaEvent, KafkaMessage, PaymentMicroservice } from '@nestjs-microservices/shared/communication';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PaymentMicroservice.name) private readonly paymentClient: ClientKafka
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    this.paymentClient.emit(KafkaEvent.PROCESS_PAYMENT, JSON.stringify(makePaymentDto));
  }

  async getPayments() {
    const payments = await firstValueFrom(this.paymentClient.send(KafkaMessage.GET_PAYMENTS, JSON.stringify({})));
    return payments
  }

  onModuleInit() {
    this.paymentClient.subscribeToResponseOf(KafkaMessage.GET_PAYMENTS);
  }
}
