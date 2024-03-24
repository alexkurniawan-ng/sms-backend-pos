import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [TypeOrmModule],
})
export class UserModule {}
