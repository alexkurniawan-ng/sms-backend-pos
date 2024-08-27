import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { InvoiceProduct } from '../invoice-product/invoice-product.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'invoice_total' })
  invoiceTotal: number;

  @Column({ name: 'discount' })
  discount: number;

  @Column({ name: 'down_payment' })
  downPayment: number;

  @Column({ name: 'payment_status' })
  paymentStatus: string;

  @Column({ name: 'invoice_number' })
  invoiceNumber: string;

  @Column({ name: 'invoice_date' })
  invoiceDate: Date;

  @Column({ name: 'customer_reference_number' })
  customerRefNumber: string;

  @Column({ name: 'invoice_note' })
  note: string;

  @Column({ name: 'invoice_memo' })
  memo: string;

  @Column({ name: 'invoice_delivery_date' })
  deliveryDate: Date;

  @Column({ name: 'invoice_delivery_contact_name' })
  invoiceDeliveryContactName: string;

  @Column({ name: 'invoice_delivery_contact_number' })
  invoiceDeliveryContactNumber: string;

  @Column({ name: 'invoice_delivery_address' })
  invoiceDeliveryAddress: string;

  @Column({ name: 'delivery_status' })
  deliveryStatus: string;

  @Column({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ name: 'linked_jurnal_invoice_id' })
  linkedJurnalId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => InvoiceProduct, (invoiceproduct) => invoiceproduct.invoice)
  invoiceProducts: InvoiceProduct[];
}
