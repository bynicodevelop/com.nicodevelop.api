import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { UserData } from '../types/user-type';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{ data: UserData[] }> {
    const users = await this.userService.findAll();

    return {
      data: users.map(
        ({ _id, email }): UserData => ({ userId: _id.toString(), email }),
      ),
    };
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createCatDto: CreateUserDto,
    @Res() response,
  ): Promise<{ data: UserData }> {
    const { _id, email } = await this.userService.create(createCatDto);

    return response.json({
      data: {
        userId: _id.toString(),
        email,
      },
    });
  }
}
