import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerSearchResponse } from './responses/customer-search.response';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}

  public async getCustomerBySearch(name: string): Promise<CustomerSearchResponse[]> {
    const customers = await this.customerRepository.findByNameLike(name);
    return this.convertCustomerListToCustomerSearchResponse(customers);
  }

  private convertCustomerListToCustomerSearchResponse(customers: Customer[]): CustomerSearchResponse[] {
    return customers.map((customer) => {
      return this.convertCustomerToCustomerSearchResponse(customer);
    });
  }

  private convertCustomerToCustomerSearchResponse(customer: Customer): CustomerSearchResponse {
    return {
      id: customer.id,
      customerName: customer.customerName,
      customerIdentityAddress: customer.customerIdentityAddress,
      customerIdentityNumber: customer.customerIdentityNumber,
      customerIdentityType: customer.customerIdentityType,
      customerContactName: customer.customerContactName,
      customerContactNumber: customer.customerContactNumber,
      customerEmail: customer.customerEmail,
      customerDeliveryAddress: customer.customerDeliveryAddress,
      customerDeliveryContactPerson: customer.customerDeliveryContactPerson,
      customerDeliveryContactNumber: customer.customerDeliveryContactNumber,
      customerMemo: customer.CustomerMemo,
      customerJurnalId: customer.customerJurnalId,
    };
  }
}
