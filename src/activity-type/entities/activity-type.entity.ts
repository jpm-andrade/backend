import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  label: string;

  @ManyToOne(() => Shop, (shop) => shop.activityTypes)
  @JoinColumn()
  shop: Shop
}
