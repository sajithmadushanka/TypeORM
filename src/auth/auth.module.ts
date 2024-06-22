import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/TypeORM/User';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';
import { LocalAuthGuard } from './utils/LocalGuard';


@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService,UserService, LocalStrategy, SessionSerializer, LocalAuthGuard],
})
export class AuthModule {}
