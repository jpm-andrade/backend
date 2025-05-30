import { Employee } from 'src/employees/entities/employee.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class EmployeeLanguage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, (employee) => employee.employeeLanguages)
    employee!: Employee;

    @ManyToOne(() => Language)
    language!: Language;
}
