import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { InvoicesService } from './invoice.service';
import { WebResponse } from 'src/responses';
import { InvoiceResponse } from './responses/invoice.response';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { InvoiceShortResponse } from './responses/invoice-short.response';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoiceService: InvoicesService) {}

  @Get()
  @ApiOperation({ summary: '- get Invoices.' })
  // @ApiBody({ type: ContractPostRequest })
  // @ApiCreatedResponse({ type: CreatedContractShortResponse })
  async getFilteredInvoice(
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('invoice') invoice?: string,
    @Query('customer') customer?: string,
    @Query('status') status?: string,
  ): WebResponse<InvoiceShortResponse[]> {
    const response =
      !start && !end && !invoice && !customer && !status
        ? await this.invoiceService.getLastOneMonthInvoice()
        : await this.invoiceService.getFilteredListInvoice(start, end, invoice, customer, status);
    return {
      code: HttpStatus.OK,
      status: 'OK',
      data: response,
    };
  }
}
