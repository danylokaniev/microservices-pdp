import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await firstValueFrom(this.authClient.send('create_user', JSON.stringify(createUserDto)));
    return user
  }

  async getUsers() {
    const users = await firstValueFrom(this.authClient.send('get_users', JSON.stringify({})));
    return users
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('get_users');
    this.authClient.subscribeToResponseOf('create_user');
  }
}
