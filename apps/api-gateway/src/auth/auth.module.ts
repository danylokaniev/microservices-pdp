import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
