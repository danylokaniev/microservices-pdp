import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  amount: number;
}
