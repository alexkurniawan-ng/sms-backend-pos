import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { WebResponse } from 'src/responses';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('search')
  async getProductListFromDatabase(@Query('name') name?: string): WebResponse<Product[]> {
    const response = await this.productService.getSearchProduct(name);
    return {
      code: HttpStatus.OK,
      status: 'OK',
      data: response,
    };
  }
}
