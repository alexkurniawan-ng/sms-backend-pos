import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InvoiceProduct } from '../invoice-product/invoice-product.entity';
import { Product } from '../products/product.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'unit_name' })
  unitName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => InvoiceProduct, (invoiceproduct) => invoiceproduct.unit)
  invoiceProduct: InvoiceProduct;

  @OneToOne(() => Product, (product) => product.unit)
  product: Product;
}
