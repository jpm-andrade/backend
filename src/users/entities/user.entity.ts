
import { AuthorizedShop } from 'src/authorized-shops/entities/authorized-shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  username?: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => AuthorizedShop, (authShop)=> authShop.user)
  authShop: AuthorizedShop[]
}
