import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserModule } from '../../src/user/user.module';
import { UserService } from '../../src/user/user.service';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';

describe('UserController', () => {
  let app: INestApplication;

  const userService = {
    findAll: () => [
      {
        _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
        email: 'john@domain.tld',
      },
    ],
    create: () => ({
      _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
      email: 'john@domain.tld',
      password: '123456',
      salt: '123456',
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nest'),
        UserModule,
      ],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect({
      data: userService.findAll(),
    });
  });

  it(`/POST users`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'john@domain.tld',
        password: '123456',
      })
      .expect(201)
      .expect({
        data: {
          _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
          email: 'john@domain.tld',
        },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
