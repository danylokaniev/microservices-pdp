import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMicroservice } from '@nestjs-microservices/shared/communication';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '@nestjs-microservices/shared/entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AuthMicroservice.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: AuthMicroservice.clientId,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: AuthMicroservice.groupId,
          },
        },
      },
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
