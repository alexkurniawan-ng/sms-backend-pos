import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public async getSearchProduct(name: string): Promise<Product[]> {
    return await this.productRepository.findProductsByLikeName(name);
  }
}
