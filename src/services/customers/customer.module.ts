import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerRepository],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
