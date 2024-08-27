import { Injectable } from '@nestjs/common';
import { ProductRepository, UnitRepository } from './product.repository';
import { Product } from './product.entity';
import { Unit } from '../units/unit.entity';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository, private unitRepository: UnitRepository) {}

  public async getSearchProduct(name: string): Promise<Product[]> {
    return await this.productRepository.findProductsByLikeName(name);
  }

  public async getUnitsById(id: string): Promise<Unit> {
    return await this.unitRepository.findUnitsById(id);
  }

  public async getJournalById(id: string): Promise<any> {
    // return await this.unitRepository.findUnitsById(id);
    // AXIOSSSSSS
  }
}
