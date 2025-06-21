import { Activity } from 'src/activities/entities/activity.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinTable, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkInDate: Date;

  @Column({ nullable: true })
  certificationLevel?: string;

  @Column({
    default: "English"
  })
  language: string

  @Column({ default: false })
  isCanceled: boolean

  @OneToMany(() => Activity, (activities) => activities.booking,
    {
      eager:true,
      nullable:true
    }
  )
  activities: Activity[];

  @ManyToOne(() => Shop, {
    nullable: false
  })
  @JoinColumn()
  shop: Shop;


  @ManyToOne(() => Customer, {
    nullable: false,
    eager: true
  })
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => BookingType, {
    nullable: true,
    eager: true
  })
  @JoinColumn()
  bookingType: BookingType;

  @Column({nullable:true})
  serviceCost: number
  
  @Column({
    nullable:true
  })
  discount: number;

  @Column({
    nullable:true
  })  
  deposit: number;

  @Column({
    nullable:true
  })  
  value: number;

  @OneToOne(() => User)
  createdBy: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(() => User)
  updatedBy: User

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
