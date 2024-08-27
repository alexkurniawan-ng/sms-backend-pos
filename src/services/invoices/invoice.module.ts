import { Module } from '@nestjs/common';
import { InvoicesService } from './invoice.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoicesController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { Customer } from '../customers/customer.entity';
import { CustomerRepository } from '../customers/customer.repository';
import { User, UserRepository } from '../users';
import { InvoiceProduct } from '../invoice-product/invoice-product.entity';
import { InvoiceProductRepository } from '../invoice-product/invoice-product.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Invoice, InvoiceProduct, Customer, User])],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceRepository, InvoiceProductRepository, CustomerRepository, UserRepository],
  exports: [TypeOrmModule],
})
export class InvoicesModule {}
