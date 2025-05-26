import { Language } from 'src/languages/entities/language.entity';
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

  @OneToMany(() => Language, (language) => language.employee)
  languange: Language[]

  @ManyToOne(() => Shop, (shop)=> shop.employees)
  shop: Shop;

  @OneToOne(type => User)
  createdBy: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(type => User)
  updatedBy: User

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
