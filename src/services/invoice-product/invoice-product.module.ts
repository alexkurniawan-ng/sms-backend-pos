import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from './invoice-product.entity';
import { Customer } from '../customers/customer.entity';
import { Invoice } from '../invoices/invoice.entity';
import { InvoiceRepository } from '../invoices/invoice.repository';
import { ProductRepository } from '../products/product.repository';
import { InvoiceProductRepository } from './invoice-product.repository';
import { Unit } from '../units/unit.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([InvoiceProduct, Invoice, Customer, Unit])],
  // controllers: [InvoicesController],
  // providers: [InvoicesService, InvoiceRepository, CustomerRepository, UserRepository],
  providers: [InvoiceProductRepository, InvoiceRepository, ProductRepository],
  exports: [TypeOrmModule],
})
export class InvoiceProductModule {}
