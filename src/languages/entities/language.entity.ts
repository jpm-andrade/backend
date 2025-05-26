import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  shortLabel: string;

  @ManyToOne(() => Employee, (employee)=> employee.languange)
  employee: Employee;

  @OneToOne(() => User)
  createdBy: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(() => User)
  updatedBy: User

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
