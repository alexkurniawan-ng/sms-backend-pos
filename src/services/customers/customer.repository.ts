import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, QueryRunner, Repository } from 'typeorm';
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
}
