import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Like, QueryRunner, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createAndSave(queryRunner: QueryRunner, entity: DeepPartial<Product>): Promise<Product> {
    const product = await this.create(entity);
    await queryRunner.manager.save(product);
    return product;
  }

  async findProductsByLikeName(productName: string): Promise<Product[]> {
    return this.find({
      where: {
        productName: Like(`%${productName}%`),
      },
      order: { productStock: 'DESC' },
    });
  }
}
