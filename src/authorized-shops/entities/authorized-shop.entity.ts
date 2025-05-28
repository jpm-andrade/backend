import { Customer } from 'src/customers/entities/customer.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class AuthorizedShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Shop)
  shops: Shop;

  @OneToOne(() => Organization, {nullable: true})
  organization: Organization;

  @ManyToOne(() => User, (user)=> user.authShop)
  user: User

  

}
