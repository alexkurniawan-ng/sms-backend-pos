import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Invoice } from '../invoices/invoice.entity';
import { InvoiceProduct } from '../invoice-product/invoice-product.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ name: 'customer_identity_address' })
  customerIdentityAddress: string;

  @Column({ name: 'customer_identity_number' })
  customerIdentityNumber: string;

  @Column({ name: 'customer_identity_type' })
  customerIdentityType: string;

  @Column({ name: 'customer_contact_name' })
  customerContactName: string;

  @Column({ name: 'customer_contact_number' })
  customerContactNumber: string;

  @Column({ name: 'customer_email' })
  customerEmail: string;

  @Column({ name: 'customer_delivery_address' })
  customerDeliveryAddress: string;

  @Column({ name: 'customer_delivery_contact_person' })
  customerDeliveryContactPerson: string;

  @Column({ name: 'customer_delivery_contact_number' })
  customerDeliveryContactNumber: string;

  @Column({ name: 'customer_memo' })
  CustomerMemo: string;

  @Column({ name: 'customer_jurnal_id' })
  customerJurnalId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
