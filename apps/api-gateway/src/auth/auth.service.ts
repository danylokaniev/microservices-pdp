import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { firstValueFrom } from 'rxjs';

import { AuthMicroservice, KafkaMessage } from '@nestjs-microservices/shared/communication';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthMicroservice.name) private readonly authClient: ClientKafka
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await firstValueFrom(this.authClient.send(KafkaMessage.CREATE_USER, JSON.stringify(createUserDto)));
    return user
  }

  async getUsers() {
    const users = await firstValueFrom(this.authClient.send(KafkaMessage.GET_USERS, JSON.stringify({})));
    return users
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf(KafkaMessage.CREATE_USER);
    this.authClient.subscribeToResponseOf(KafkaMessage.GET_USERS);
  }
}
