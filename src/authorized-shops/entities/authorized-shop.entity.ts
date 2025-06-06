import { Customer } from 'src/customers/entities/customer.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class AuthorizedShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Shop, {eager:true})
  shops: Shop;

  @ManyToOne(() => Organization, {nullable: true, eager:true})
  organization: Organization;

  @ManyToOne(() => User, (user)=> user.authShop)
  user: User

  

}
