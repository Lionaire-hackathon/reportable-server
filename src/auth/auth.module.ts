import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './entity/identity.entity';
import { User } from 'src/users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  // TypeOrmModule을 사용하여 Identity와 User 엔터티를 주입합니다.
  imports: [
    TypeOrmModule.forFeature([Identity, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
