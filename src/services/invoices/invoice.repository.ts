import { Injectable } from '@nestjs/common';
import { Between, DataSource, DeepPartial, IsNull, LessThanOrEqual, MoreThan, Not, QueryRunner, Repository } from 'typeorm';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async createAndSave(queryRunner: QueryRunner, entity: DeepPartial<Invoice>): Promise<Invoice> {
    const invoice = await this.create(entity);
    await queryRunner.manager.save(invoice);
    return invoice;
  }

  findAll(): Promise<Invoice[]> {
    return this.find({ order: { invoiceDate: 'DESC' } });
  }

  findAllByFilter(start: string, end: string, invoice: string, customerName: string, status: string): Promise<Invoice[]> {
    const payment = status === 'Lunas' ? 'paid' : status === 'Belum Bayar' ? 'unpaid' : status === 'Sebagian' ? 'partial' : 'all';
    return this.createQueryBuilder('invoices')
      .leftJoinAndSelect('invoices.customer', 'customer')
      .where('invoices.invoiceDate BETWEEN :start AND :end', { start: new Date(start), end: new Date(end) })
      .andWhere('invoices.invoiceNumber LIKE :invoice', { invoice: `%${invoice}%` })
      .andWhere(customerName ? 'customer.customerName LIKE :customerName' : '1=1', { customerName: `%${customerName}%` })
      .andWhere(payment === 'all' ? 'invoices.paymentStatus IS NOT NULL' : 'invoices.paymentStatus = :payment', { payment })
      .orderBy('invoices.invoiceDate', 'DESC')
      .getMany();
  }

  findLastOneMonth(): Promise<Invoice[]> {
    const today = new Date();
    const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
    return this.find({
      where: {
        invoiceDate: Between(lastMonth, today),
      },
      order: { invoiceDate: 'DESC' },
    });
  }

  findById(id: string): Promise<Invoice> {
    return this.findOne({
      where: { id },
    });
  }
}
