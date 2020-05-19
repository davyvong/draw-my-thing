// import { HttpStatus } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  // it('/hello (GET)', () => {
  //   return app.inject({
  //     method: 'GET',
  //     url: '/hello',
  //   })
  //   .then(response => {
  //     expect(response.statusCode).toEqual(HttpStatus.OK);
  //     expect(JSON.parse(response.payload)).toEqual({ data: 'Hello World!' });
  //   });
  // });
});
