import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AuthMicroservice, KafkaMessage } from '@nestjs-microservices/shared/communication';
import { firstValueFrom } from 'rxjs';
import { Payment } from '@nestjs-microservices/shared/entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(AuthMicroservice.name) private readonly authClient: ClientKafka,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>
  ) {}

  async processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount, description } = makePaymentDto;
    const user = await firstValueFrom(this.authClient.send(KafkaMessage.GET_USER, JSON.stringify({ userId })));
    return this.create({ amount, description, user });
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).exec();
  }

  async create(payment: Partial<Payment>): Promise<Payment> {
    const newPayment = new this.paymentModel(payment);
    return newPayment.save();
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf(KafkaMessage.GET_USER);
  }
}
