import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  const salt = await bcrypt.genSalt(parseInt(process.env.APP_HASH_SALT));

  const pwdHashed = await bcrypt.hash(this.password, salt);

  this.password = pwdHashed;

  next();
});

export const UserSchemaModel = UserSchema;
