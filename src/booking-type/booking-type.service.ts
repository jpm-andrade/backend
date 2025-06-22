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
    bookingType.bookingPrice = createBookingTypeDto.price
    if (createBookingTypeDto.actvityLimit)
      bookingType.actvityLimit = createBookingTypeDto.actvityLimit
    bookingType.packageDeal = createBookingTypeDto.packageDeal
    bookingType.isCourse = createBookingTypeDto.isCourse
    bookingType.needsCert = createBookingTypeDto.needsCert
    bookingType.serviceCost = createBookingTypeDto.serviceCost ? createBookingTypeDto.serviceCost : 0


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

  findOne(id: number) {
    return this.bookingTypeRepository.findOneBy({ id: id });;
  }

  async findBasedOnShop(id: number) {
    const bookingType = await this.bookingTypeRepository.find(
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

    const response = bookingType.map((bk) => {
      return {
        id: bk.id,
        category: bk.category,
        label: bk.label,
        price: bk.bookingPrice,
        packageDeal: bk.packageDeal,
        isCourse: bk.isCourse,
        actvityLimit: bk.actvityLimit,
        needsCert: bk.needsCert,
        serviceCost: bk.serviceCost,
        isActive: bk.isActive
      }
    })

    return response
  }

  async update(id: number, updateBookingTypeDto: UpdateBookingTypeDto) {
    let bookingType = await this.bookingTypeRepository.findOneBy({ id: id })

    if (!bookingType) {

    } else {
      bookingType.category = updateBookingTypeDto.category
      bookingType.label = updateBookingTypeDto.label
      bookingType.bookingPrice = updateBookingTypeDto.price
      if (updateBookingTypeDto.actvityLimit)
        bookingType.actvityLimit = updateBookingTypeDto.actvityLimit
      bookingType.packageDeal = updateBookingTypeDto.packageDeal
      bookingType.isCourse = updateBookingTypeDto.isCourse
      bookingType.needsCert = updateBookingTypeDto.needsCert
      bookingType.serviceCost = updateBookingTypeDto.serviceCost ? updateBookingTypeDto.serviceCost : 0
      bookingType.isActive = updateBookingTypeDto.isActive == undefined ? true : updateBookingTypeDto.isActive



      console.log(bookingType)
      return this.bookingTypeRepository.save(bookingType);
    }

  }

  async updateInactive(id: number, active: boolean) {
    let bookingType = await this.bookingTypeRepository.findOneBy({ id: id })

    if (!bookingType) {
    } else {
      bookingType.isActive = active
      return this.bookingTypeRepository.save(bookingType);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bookingType`;
  }
}
