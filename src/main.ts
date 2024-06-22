import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './TypeORM';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource: DataSource = app.get(getDataSourceToken());
  const sessionRepository = dataSource.getRepository(SessionEntity);

  app.use(session({ secret:'abc', resave:false, saveUninitialized:false,
    cookie:{
      maxAge:60000
    },
    store: new TypeormStore({
      cleanupLimit: 10,
      limitSubquery: false,
      ttl: 60000
    }).connect(sessionRepository)
   }));
  app.use(passport.initialize())
  app.use(passport.session())


  
  await app.listen(3000);
}
bootstrap();


 