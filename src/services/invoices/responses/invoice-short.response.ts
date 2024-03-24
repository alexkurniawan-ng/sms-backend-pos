export interface InvoiceShortResponse {
  id: string;
  customer: string;
  invoiceNumber: string;
  invoiceDate: Date;
  invoiceTotal: number;
  paymentStatus: string;
  createdBy: string;
}
