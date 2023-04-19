import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@nestjs-microservices/shared/entity';

import { AppService } from './app.service';

import { KafkaMessage } from '@nestjs-microservices/shared/communication';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(KafkaMessage.CREATE_USER)
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto): Promise<User> {
    return this.appService.create(data);
  }

  @MessagePattern(KafkaMessage.GET_USER)
  handleGetUser(@Payload('userId') userId: string) {
    return this.appService.findOne(userId);
  }

  @MessagePattern(KafkaMessage.GET_USERS)
  handleGetUsers() {
    return this.appService.findAll();
  }
}
