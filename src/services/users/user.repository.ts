import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, QueryRunner, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createAndSave(queryRunner: QueryRunner, entity: DeepPartial<User>): Promise<User> {
    const user = await this.create(entity);
    await queryRunner.manager.save(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.find();
  }
}
