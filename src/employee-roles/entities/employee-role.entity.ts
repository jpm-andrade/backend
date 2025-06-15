import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@Entity()
export class EmployeeRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.role)
    employees: Employee[];

    @ManyToOne(() => Shop, (shop) => shop.role)
    shop: Shop;
}
