import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MakePaymentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description: string;
}
