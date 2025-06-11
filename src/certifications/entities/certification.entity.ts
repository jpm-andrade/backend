import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToOne(() => Shop, (shop) => shop.certification, {eager:true})
  @JoinColumn()
  shop: Shop
}
