import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { WebResponse } from 'src/responses';
import { Product } from './product.entity';
import { Unit } from '../units/unit.entity';

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

  @Get('unit/:id')
  async getUnitsFromDatabase(@Param('id') id: string): WebResponse<Unit> {
    const response = await this.productService.getUnitsById(id);
    return {
      code: HttpStatus.OK,
      status: 'OK',
      data: response,
    };
  }

  @Get('journal/:id')
  async getJournalFromMekari(@Param('id') id: string): WebResponse<any> {
    const response = await this.productService.getJournalById(id);
    return {
      code: HttpStatus.OK,
      status: 'OK',
      data: response,
    };
  }
}
