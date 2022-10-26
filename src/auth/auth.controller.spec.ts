import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: INestApplication;

  const authService = {
    login: () => ({
      access_token: 'token',
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nest'),
        AuthModule,
      ],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('Should login user with success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john@domain.tld',
        password: '123456',
      })
      .expect({
        data: authService.login(),
      });
  });
});
