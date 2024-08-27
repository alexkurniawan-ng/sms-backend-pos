import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { Unit } from './unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit])],
  exports: [TypeOrmModule],
})
export class UnitModule {}
