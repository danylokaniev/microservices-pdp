import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from '@nestjs-microservices/shared/dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getPayments() {
    return this.paymentService.getPayments();
  }

  @Post('pay')
  makePayment(@Body(ValidationPipe) makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
