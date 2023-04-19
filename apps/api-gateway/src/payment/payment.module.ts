import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentMicroservice } from '@nestjs-microservices/shared/communication';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PaymentMicroservice.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: PaymentMicroservice.clientId,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: PaymentMicroservice.groupId,
          },
        },
      },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
