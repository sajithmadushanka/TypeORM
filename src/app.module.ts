import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './TypeORM';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port:3306,
    username: 'root',
    password: '12345',
    database: 'type_orm',
    entities: entities,
    synchronize: true,
  }), AuthModule,
  
],
})
export class AppModule {}
