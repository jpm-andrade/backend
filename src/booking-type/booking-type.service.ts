import { Injectable } from '@nestjs/common';
import { CreateBookingTypeDto } from './dto/create-booking-type.dto';
import { UpdateBookingTypeDto } from './dto/update-booking-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingType } from './entities/booking-type.entity';

@Injectable()
export class BookingTypeService {

  constructor(
    @InjectRepository(BookingType)
    private readonly userRepository: Repository<BookingType>,
  ) {}

  create(createBookingTypeDto: CreateBookingTypeDto) {
    return 'This action adds a new bookingType';
  }

  findAll() {
    return `This action returns all bookingType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingType`;
  }

  update(id: number, updateBookingTypeDto: UpdateBookingTypeDto) {
    return `This action updates a #${id} bookingType`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingType`;
  }
}
