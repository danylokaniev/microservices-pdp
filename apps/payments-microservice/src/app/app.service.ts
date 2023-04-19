import { MakePaymentDto, UserDto } from '@nestjs-microservices/shared/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AuthMicroservice, KafkaMessage } from '@nestjs-microservices/shared/communication';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(AuthMicroservice.name) private readonly authClient: ClientKafka
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('process payment');
    this.authClient
      .send(KafkaMessage.GET_USER, JSON.stringify({ userId }))
      .subscribe((user: UserDto) => {
        console.log(
          `process payment for user ${user.name} - amount: ${amount}`
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf(KafkaMessage.GET_USER);
  }
}
