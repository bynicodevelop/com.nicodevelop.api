import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schemas';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserData } from 'src/types/user-type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const { _id: userId, password } = await this.userModel.findOne({
      email: loginUserDto.email,
    });

    if (!(await bcrypt.compare(loginUserDto.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = <UserData>{ email: loginUserDto.email, userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
