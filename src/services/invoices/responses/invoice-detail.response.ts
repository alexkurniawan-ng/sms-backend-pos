export interface InvoiceDetailResponse {
  customer: string;
  invoiceTotal: number;
  discount: number;
  downPayment: number;
  paymentStatus: string;
  invoiceNumber: string;
  invoiceDate: Date;
  note: string;
  memo: string;
  linkedJurnalId: string;
  products: ProductInvoiceResponse[];
}

export interface ProductInvoiceResponse {
  productName: string;
  productCode: string;
  quantity: number;
  price: number;
  unit: string;
}
