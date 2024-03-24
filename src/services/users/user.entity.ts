import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'remember_token' })
  token: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
