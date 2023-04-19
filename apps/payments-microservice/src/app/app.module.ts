import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMicroservice } from '@nestjs-microservices/shared/communication';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
