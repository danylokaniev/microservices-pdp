import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/entities';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  createUser(createUserDto: CreateUserDto) {
    this.authClient.emit('create_user', JSON.stringify(createUserDto));
  }

  async getUsers() {
    const users = await firstValueFrom(this.authClient.send('get_users', JSON.stringify({})));
    return users
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('get_users');
  }
}
