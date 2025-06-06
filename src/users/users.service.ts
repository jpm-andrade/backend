import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }


  create(createUserDto: CreateUserDto) {
    const user = new User()

    user.email = createUserDto.email
    user.password = createUserDto.password
    user.username = createUserDto.username
    user.isActive = true

    return this.userRepository.save(user);
  }


  async update(updateUserDto: UpdateUserDto) {
    let user = await this.findByEmail(updateUserDto.email)

    if (user == null) {
      new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This user does not exist',
      }, HttpStatus.FORBIDDEN, {
        cause: "User not found"
      })
    } else {
      user.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
      user.name = updateUserDto.name

      return this.userRepository.save(user)

    }
  }

  async updateToken(email: string, token: string) {
    let user = await this.findByEmail(email)
    if (user == null) {
      new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This user does not exist',
      }, HttpStatus.FORBIDDEN, {
        cause: "User not found"
      })
    } else {
      user.token = token
      return this.userRepository.save(user)
    }

  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneByOrFail({ username: username })
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByOrFail({ email: email })
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

}
