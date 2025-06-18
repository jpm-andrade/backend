import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class BookingType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  label: string;

  @ManyToOne(() => Shop, (shop) => shop.bookingTypes)
  @JoinColumn()
  shop: Shop

  @Column()
  bookingPrice: number

  @Column({default:false})
  needsCert:boolean

  @Column({default:false})
  packageDeal:boolean

  @Column({nullable:true})
  actvityLimit:number
}
