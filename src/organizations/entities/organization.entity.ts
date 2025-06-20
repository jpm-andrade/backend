import { AuthorizedShop } from 'src/authorized-shops/entities/authorized-shop.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Shop, (shops) => shops.organization, {nullable: true})
  shops: Shop[];

  @OneToMany(() => AuthorizedShop, (authShop)=> authShop.user)
  authShop: AuthorizedShop[]

}
