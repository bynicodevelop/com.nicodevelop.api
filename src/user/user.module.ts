import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemaModel } from '../schemas/user.schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchemaModel }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
