import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { ShopsService } from 'src/shops/shops.service';
import { CustomersService } from 'src/customers/customers.service';
import { BookingTypeService } from 'src/booking-type/booking-type.service';
import { Shop } from 'src/shops/entities/shop.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(BookingType)
    private readonly bookingTypeRepository: Repository<BookingType>,
  ) { }


  async create(createBookingDto: CreateBookingDto) {
    const booking = new Booking()

    const shop = await this.shopRepository.findOneBy({id:createBookingDto.shopId})

    if (!shop) {
      throw Error()
    }

    const customer = await this.customerRepository.findOneBy({id:createBookingDto.customerId})

    if (!customer) {
      throw Error()
    }

    const bookingType = await this.bookingTypeRepository.findOneBy({id:createBookingDto.bookingTypeId})

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
    return this.bookingRepository.find();
  }

  findOne(id: number) {
    return this.bookingRepository.findOneBy({ id: id });
  }
  /**
   * 
   * @param id 
   * @returns 
   */
  findByShop(id: number) {
    return this.bookingRepository.find(
        {
          relations:{
            shop:true,
          },
          where:{
            shop:{
              id:id
            }
          }
        }
    )
  }


  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
