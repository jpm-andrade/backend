import { EmployeeLanguage } from 'src/employee-languages/entities/employee-language.entity';
import { EmployeeRole } from 'src/employee-roles/entities/employee-role.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column()
  freelancer: boolean;

  @Column({nullable:true})
  fixedRate: number

  @ManyToOne(() => EmployeeRole, (role) => role.employees, { eager: true })
  role: EmployeeRole;

  @Column({nullable:true})
  status: string;

  @OneToMany(() => EmployeeLanguage, (employeeLanguage) => employeeLanguage.employee,
    { cascade: true, eager: true }
  )
  employeeLanguages!: EmployeeLanguage[];

  @ManyToOne(() => Shop, (shop) => shop.employees, {
    eager: true
  })
  shop: Shop;

  @OneToOne(() => User)
  createdBy: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(() => User)
  updatedBy: User

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
