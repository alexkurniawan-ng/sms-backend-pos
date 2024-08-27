import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InvoiceProduct } from '../invoice-product/invoice-product.entity';
import { Unit } from '../units/unit.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'product_code' })
  productCode: string;

  @Column({ name: 'product_stock' })
  productStock: string;

  @Column({ name: 'unit_id' })
  unitId: number;

  @Column({ name: 'product_price' })
  productPrice: number;

  @Column({ name: 'last_price_update' })
  lastPriceUpdate: Date;

  @Column({ name: 'product_description' })
  productDescription: string;

  @Column({ name: 'product_jurnal_id' })
  productJurnalId: string;

  @Column({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => InvoiceProduct, (invoiceproduct) => invoiceproduct.product)
  invoiceProduct: InvoiceProduct;

  @OneToOne(() => Unit, (unit) => unit.product)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;
}
