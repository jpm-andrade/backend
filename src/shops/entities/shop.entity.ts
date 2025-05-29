import { ActivityType } from 'src/activity-type/entities/activity-type.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  country: string;

  @OneToMany(() => Employee, (employees) => employees.shop)
  employees: Employee[];

  @ManyToOne(() => Organization, (organization)=> organization.shops)
  organization: Organization

  @OneToMany(() => ActivityType, (activityType) => activityType.shop)
  activityTypes: ActivityType[]

  @OneToMany(() => ActivityType, (bookingTypes) => bookingTypes.shop)
  bookingTypes: BookingType[]

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
