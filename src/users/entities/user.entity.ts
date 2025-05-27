
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
