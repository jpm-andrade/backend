import { Injectable } from '@nestjs/common';
import { CreateBookingTypeDto } from './dto/create-booking-type.dto';
import { UpdateBookingTypeDto } from './dto/update-booking-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingType } from './entities/booking-type.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { ShopsService } from 'src/shops/shops.service';

@Injectable()
export class BookingTypeService {

  constructor(
    @InjectRepository(BookingType)
    private readonly bookingTypeRepository: Repository<BookingType>,
    private readonly shopService: ShopsService

  ) { }

  async create(createBookingTypeDto: CreateBookingTypeDto) {
    const shop = await this.shopService.findOne(createBookingTypeDto.shopId)

    if (!shop) {
      throw Error()
    }

    const bookingType = new BookingType();

    bookingType.category = createBookingTypeDto.category
    bookingType.label = createBookingTypeDto.label
    bookingType.shop = shop

    return this.bookingTypeRepository.save(bookingType);
  }

  findAll() {
    return this.bookingTypeRepository.find(
      {
        relations: {
          shop: true
        },
      }
    );;
  }

  async findBasedOnShop(id: number) {
    return await this.bookingTypeRepository.find(
      {
        relations: {
          shop: true
        },
        where: {
          shop: {
            id: id
          }
        }
      }
    );;
  }

  async update(id: number, updateBookingTypeDto: UpdateBookingTypeDto) {
    let bookingType = await this.bookingTypeRepository.findOneBy({ id: id })

    if (!bookingType) {

    } else {
      bookingType.category = updateBookingTypeDto.category
      bookingType.label = updateBookingTypeDto.label
      return this.bookingTypeRepository.save(bookingType);
    }

  }

  remove(id: number) {
    return `This action removes a #${id} bookingType`;
  }
}
