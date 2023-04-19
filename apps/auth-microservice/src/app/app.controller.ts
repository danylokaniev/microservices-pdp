import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { User } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto): Promise<User> {
    return this.appService.create(data);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId') userId: string) {
    return this.appService.findOne(userId);
  }

  @MessagePattern('get_users')
  handleGetUsers() {
    return this.appService.findAll();
  }
}
