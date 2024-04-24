import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { WebResponse } from 'src/responses';
import { CustomerSearchResponse } from './responses/customer-search.response';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('search')
  async searchCustomer(@Query('name') name: string): WebResponse<CustomerSearchResponse[]> {
    const response = await this.customerService.getCustomerBySearch(name);
    return {
      code: HttpStatus.OK,
      status: 'OK',
      data: response,
    };
  }
}
