import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, QueryRunner, Repository } from 'typeorm';
import { InvoiceProduct } from './invoice-product.entity';

@Injectable()
export class InvoiceProductRepository extends Repository<InvoiceProduct> {
  constructor(private dataSource: DataSource) {
    super(InvoiceProduct, dataSource.createEntityManager());
  }

  async createAndSave(queryRunner: QueryRunner, entity: DeepPartial<InvoiceProduct>): Promise<InvoiceProduct> {
    const invoiceProduct = await this.create(entity);
    await queryRunner.manager.save(invoiceProduct);
    return invoiceProduct;
  }

  findByInvoiceId(invoiceId: string): Promise<InvoiceProduct[]> {
    return this.find({
      where: { invoiceId },
      relations: ['product', 'product.unit', 'invoice', 'invoice.customer'],
    });
  }
}
