import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository, UnitRepository } from './product.repository';
import { Unit } from '../units/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, UnitRepository],
  exports: [TypeOrmModule],
})
export class ProductModule {}
