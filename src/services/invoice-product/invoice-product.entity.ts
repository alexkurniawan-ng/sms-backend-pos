import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Invoice } from '../invoices/invoice.entity';
import { Customer } from '../customers/customer.entity';
import { Unit } from '../units/unit.entity';

@Entity('invoice_product')
export class InvoiceProduct {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'invoice_id' })
  invoiceId: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'unit_id' })
  unitId: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price' })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Product, (product) => product.invoiceProduct)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceProducts)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  get customer(): Customer {
    return this.invoice.customer;
  }

  get unit(): Unit {
    return this.product.unit;
  }
}
