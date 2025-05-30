import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { ShopsService } from 'src/shops/shops.service';
import { CustomersService } from 'src/customers/customers.service';
import { BookingTypeService } from 'src/booking-type/booking-type.service';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly shopService: ShopsService,
    private readonly customerService: CustomersService,
    private readonly bookingTypeService: BookingTypeService


  ) { }


  async create(createBookingDto: CreateBookingDto) {
    const booking = new Booking()

    const shop = await this.shopService.findOne(createBookingDto.shopId)

    if (!shop) {
      throw Error()
    }

    const customer = await this.customerService.findOne(createBookingDto.customerId)

    if (!customer) {
      throw Error()
    }

    const bookingType = await this.bookingTypeService.findOne(createBookingDto.bookingTypeId)

    if (!bookingType) {
      throw Error()
    }


    booking.checkInDate = createBookingDto.checkInDate;
    booking.certificationLevel = createBookingDto.certificationLevel
    booking.language = createBookingDto.language;
    booking.country = createBookingDto.country;
    booking.referedFrom = createBookingDto.referedFrom;
    booking.shop = shop
    booking.customer = customer
    booking.bookingType = bookingType

    
    return this.bookingRepository.save(booking);
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return this.bookingRepository.findOneBy({id:id});
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
