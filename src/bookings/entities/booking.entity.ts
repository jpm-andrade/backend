import { Activity } from 'src/activities/entities/activity.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinTable, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkInDate: Date;

  @Column()
  certificationLevel: string;

  @Column()
  language: string

  @Column()
  country: string;

  @Column()
  referedFrom: string;

  @OneToMany(() => Activity, (activities) => activities.booking)
  activities: Activity[];

  @OneToOne(() => Shop, {
    nullable: false
  })
  @JoinColumn()
  shop: Shop;

  @OneToOne(() => Customer, {
    nullable: false
  })
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => BookingType, {
    nullable: false
  })
  @JoinColumn()
  bookingType: BookingType;

  @OneToOne(() => User)
  createdBy: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(() => User)
  updatedBy: User

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
