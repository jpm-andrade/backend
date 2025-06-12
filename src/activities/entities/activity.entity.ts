import { ActivityType } from 'src/activity-type/entities/activity-type.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinTable, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(()=> Employee)
  @JoinColumn()
  employee: Employee;

  @OneToOne(()=> ActivityType)
  @JoinColumn()
  activityType: ActivityType;

  @ManyToOne(() => Booking, (booking) => booking.activities)
  booking: Booking;

  @Column()
  price: number;

  @OneToOne(() => User)
  @JoinColumn()
  createdBy: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  updatedBy: User

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
