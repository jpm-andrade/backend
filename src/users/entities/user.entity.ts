
import { AuthorizedShop } from 'src/authorized-shops/entities/authorized-shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  username?: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => AuthorizedShop, (authShop)=> authShop.user, {
    eager: true
  })
  authShop: AuthorizedShop[]

  @Column({nullable:true})
  token: string

  @Column({ default: false })
  isAdmin: string
}
