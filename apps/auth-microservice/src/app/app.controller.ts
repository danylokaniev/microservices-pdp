import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
    this.appService.create(data);
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
