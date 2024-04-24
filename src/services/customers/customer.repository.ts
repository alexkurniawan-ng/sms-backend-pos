import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Like, QueryRunner, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  async createAndSave(queryRunner: QueryRunner, entity: DeepPartial<Customer>): Promise<Customer> {
    const customer = await this.create(entity);
    await queryRunner.manager.save(customer);
    return customer;
  }

  findAll(): Promise<Customer[]> {
    return this.find();
  }

  findByNameLike(customerName: string): Promise<Customer[]> {
    return this.find({
      where: {
        customerName: Like(`%${customerName}%`),
      },
      order: { customerName: 'ASC' },
    });
  }
}
