import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from '../dto/user.dto';

@Schema({ timestamps: true })
export class User extends Document implements UserDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
