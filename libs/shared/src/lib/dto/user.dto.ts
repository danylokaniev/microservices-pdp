import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
