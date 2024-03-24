export interface InvoiceResponse {
  id: string;
  customerId: string;
  invoiceTotal: number;
  discount: number;
  downPayment: number;
  paymentStatus: string;
  invoiceNumber: string;
  invoiceDate: Date;
  customerRefNumber: string;
  note: string;
  memo: string;
  deliveryDate: Date;
  invoiceDeliveryContactName: string;
  invoiceDeliveryContactNumber: string;
  invoiceDeliveryAddress: string;
  deliveryStatus: string;
  linkedJurnalId: string;
}
