import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceRepository } from './invoice.repository';
// import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { InvoiceResponse } from './responses/invoice.response';
import { Invoice } from './invoice.entity';
import { CustomerRepository } from '../customers/customer.repository';
import { Customer } from '../customers/customer.entity';
import { InvoiceShortResponse } from './responses/invoice-short.response';
import { User, UserRepository } from '../users';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceRepository)
    private invoiceRepository: InvoiceRepository,
    private customerRepository: CustomerRepository,
    private userRepository: UserRepository,
  ) {}
  // private connection: Connection,

  public async getAllListInvoice(): Promise<InvoiceShortResponse[]> {
    const invoices = await this.invoiceRepository.findAll();
    const customers = await this.customerRepository.findAll();
    const users = await this.userRepository.findAll();
    return this.convertListDataToListInvoiceResponse(invoices, customers, users);
  }

  public async getLastOneMonthInvoice(): Promise<InvoiceShortResponse[]> {
    const invoices = await this.invoiceRepository.findLastOneMonth();
    const customers = await this.customerRepository.findAll();
    const users = await this.userRepository.findAll();
    return this.convertListDataToListInvoiceResponse(invoices, customers, users);
  }

  public async getFilteredListInvoice(
    start: string,
    end: string,
    invoice: string,
    customer: string,
    status: string,
  ): Promise<InvoiceShortResponse[]> {
    const invoices = await this.invoiceRepository.findAllByFilter(start, end, invoice, customer, status);
    const customers = await this.customerRepository.findAll();
    const users = await this.userRepository.findAll();
    return this.convertListDataToListInvoiceResponse(invoices, customers, users);
  }

  private getCustomer(id: string, listCustomer: Customer[]): string {
    const customer = listCustomer.find((customer) => {
      return customer.id == id;
    });
    return customer?.customerName ?? '';
  }

  private getUser(id: string, listUser: User[]): string {
    const user = listUser.find((user) => {
      return user.id == id;
    });
    return user?.username ?? '';
  }

  private convertListDataToListInvoiceResponse(listInvoice: Invoice[], listCustomer: Customer[], listUser: User[]): InvoiceShortResponse[] {
    return listInvoice.map((invoice) => this.convertToInvoiceResponse(invoice, listCustomer, listUser));
  }

  private convertToInvoiceResponse(data: Invoice, listCustomer: Customer[], listUser: User[]): InvoiceShortResponse {
    return {
      id: data.id,
      customer: this.getCustomer(data.customerId, listCustomer),
      invoiceTotal: data.invoiceTotal,
      paymentStatus: data.paymentStatus,
      invoiceNumber: data.invoiceNumber,
      invoiceDate: data.invoiceDate,
      createdBy: this.getUser(data.userId, listUser),
    };
  }
  // private convertToInvoiceResponse(data: Invoice, listCustomer: Customer[]): InvoiceResponse {
  //   return {
  //     id: data.id,
  //     customerId: data.customerId,
  //     invoiceTotal: data.invoiceTotal,
  //     discount: data.discount,
  //     downPayment: data.downPayment,
  //     paymentStatus: data.paymentStatus,
  //     invoiceNumber: data.invoiceNumber,
  //     invoiceDate: data.invoiceDate,
  //     customerRefNumber: data.customerRefNumber,
  //     note: data.note,
  //     memo: data.memo,
  //     deliveryDate: data.deliveryDate,
  //     invoiceDeliveryContactName: data.invoiceDeliveryContactName,
  //     invoiceDeliveryContactNumber: data.invoiceDeliveryContactNumber,
  //     invoiceDeliveryAddress: data.invoiceDeliveryAddress,
  //     deliveryStatus: data.deliveryStatus,
  //     linkedJurnalId: data.linkedJurnalId,
  //   };
  // }
}
