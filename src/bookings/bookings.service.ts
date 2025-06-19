import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { ActivitiesService } from 'src/activities/activities.service';
import { CreateActivityInternal } from 'src/activities/dto/create-activity-internal.dto';
import { CustomerDetailsBookingTable } from './dto/customers-table-booking.dto';
import { DisplayCustomerBooking } from './dto/display-customer-booking.dto';

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
    private readonly activitiesService: ActivitiesService
  ) { }


  async create(createBookingDto: CreateBookingDto) {
    const booking = new Booking()

    const shop = await this.shopRepository.findOneBy({ id: createBookingDto.shopId })

    if (!shop) {
      throw Error()
    }

    const customer = await this.customerRepository.findOneBy({ id: createBookingDto.customerId })

    if (!customer) {
      throw Error()
    }

    if (createBookingDto.bookingTypeId) {
      const bookingType = await this.bookingTypeRepository.findOneBy({ id: createBookingDto.bookingTypeId })

      if (!bookingType) {
        throw Error()
      }
      booking.bookingType = bookingType
    }

    booking.checkInDate = createBookingDto.checkInDate;
    booking.certificationLevel = createBookingDto.certificationLevel
    booking.language = createBookingDto.language;
    booking.shop = shop
    booking.customer = customer

    const create = await this.bookingRepository.save(booking);

    const actData = createBookingDto.activities?.map<CreateActivityInternal>((value) => {
      return {
        booking: create,
        date: value.date,
        employeeId: value.employeeId,
        price: value.price,

      }
    })
    console.log(actData)
    if (actData)
      await this.activitiesService.bulkCreate(actData)

    return this.findOne(create.id)
  }

  findAll() {
    return this.bookingRepository.find({
      relations: {
        activities: true
      }
    });
  }

  findOne(id: number) {
    return this.bookingRepository.findOne(
      {
        relations: {
          customer: true,
          activities: {
            employee: true
          },

        },
        where: {
          id: id
        }
      });
  }


  async findForCustomerDetailTable(id?: number) {
    const values = await this.bookingRepository.find(
      {
        relations: {
          customer: true,
          activities: {
            employee: true,
          },
          bookingType: true

        },
        where: {
          customer: {
            id: id
          }
        }
      });

    if (!values)
      return []

    return values.map<CustomerDetailsBookingTable>((value) => {
      const activity = value.activities.find((value, index) => index ? value : {})
      return {
        id: value.id,
        customerId: value.customer.id,
        date: value.checkInDate,
        category: value.bookingType.category,
        activity: value.bookingType.label,
        price: value.activities.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0),
        name: activity?.employee.firstName + " " + activity?.employee.lastName


      }
    })
  }

  async findForCustomersTable(shopId: number): Promise<DisplayCustomerBooking[]> {
    const subQuery = this.bookingRepository
      .createQueryBuilder("sub")
      .select("MAX(sub.checkInDate)", "maxDate")
      .addSelect("sub.customerId", "customerId")
      .innerJoin("sub.shop", "subShop")
      .where("subShop.id = :shopId", { shopId })
      .groupBy("sub.customerId");

    const latestBookings = await this.bookingRepository
      .createQueryBuilder("booking")
      .innerJoin(
        "(" + subQuery.getQuery() + ")",
        "latest",
        "booking.customerId = latest.customerId AND booking.checkInDate = latest.maxDate"
      )
      .leftJoinAndSelect("booking.customer", "customer")
      .leftJoinAndSelect("booking.bookingType", "bookingType")
      .leftJoinAndSelect("booking.activities", "activities")
      .innerJoin("booking.shop", "shop")
      .where("shop.id = :shopId", { shopId })
      .orderBy("booking.checkInDate", "DESC")
      .setParameters(subQuery.getParameters())
      .getMany();

    return latestBookings.map((value) => ({
      customerId: value.customer.id,
      name: `${value.customer.firstName} ${value.customer.lastName}`,
      status: value.activities.length === 0 ? "Check in" : "Booked",
      activity: value.bookingType ? value.bookingType.label : "",
      date: value.checkInDate,
      lastBookingType: value.bookingType ? value.bookingType.label : "",
      bookingId: value.id
    }));
  }


  async getBookingsWithActivities(id:number): Promise<any[]> {
    const bookings = await this.bookingRepository.find({
      relations: [
        'bookingType',            // BookingType { id, label, … } :contentReference[oaicite:0]{index=0}
        'activities',             // Activity[] :contentReference[oaicite:1]{index=1}
        'activities.employee',    // Employee on each Activity :contentReference[oaicite:2]{index=2}
      ],
      where:{
        shop:{
          id:id
        }
      }
    });

    return bookings.map((b) => {
      // Dedupe employees across activities
      const uniqueEmps = Array.from(
        new Map(
          b.activities.map((a) => [a.employee.id, a.employee])
        ).values()
      );

      return {
        id: b.id,
        // concat firstName + lastName
        employees: uniqueEmps.map((e) => ({
          id: e.id,
          name: `${e.firstName} ${e.lastName}`,
        })),
        bookingType: {
          id: b.bookingType.id,
          label: b.bookingType.label,
        },
        date: b.checkInDate.toISOString(),
        serviceCost: b.serviceCost ?? 0,
        activities: b.activities.map((a) => ({
          id: a.id,
          employee: {
            id: a.employee.id,
            name: `${a.employee.firstName} ${a.employee.lastName}`,
          },
          commission: a.commissionValue ?? 0,
          price: a.price,
        })),
      };
    });
  }


  /**
   * 
   * @param id 
   * @returns 
   */
  findByShop(id: number) {
    return this.bookingRepository.find(
      {
        relations: {
          shop: true,
          customer: true,
          bookingType: true,
        },
        where: {
          shop: {
            id: id
          }
        }
      }
    )
  }


  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.findOneBy({ id: id })

    if (!booking) {
      throw Error()
    }

    const shop = await this.shopRepository.findOneBy({ id: updateBookingDto.shopId })

    if (!shop) {
      throw Error()
    }

    const customer = await this.customerRepository.findOneBy({ id: updateBookingDto.customerId })

    if (!customer) {
      throw Error()
    }

    const bookingType = await this.bookingTypeRepository.findOneBy({ id: updateBookingDto.bookingTypeId })

    if (!bookingType) {
      throw Error()
    }


    booking.checkInDate = updateBookingDto.checkInDate;
    booking.certificationLevel = updateBookingDto.certificationLevel
    booking.language = updateBookingDto.language;
    booking.shop = shop
    booking.customer = customer
    booking.bookingType = bookingType


    const create = await this.bookingRepository.save(booking);

    const actData = updateBookingDto.activities?.map<CreateActivityInternal>((value) => {
      return {
        id: value.id,
        booking: create,
        date: value.date,
        employeeId: value.employeeId,
        price: value.price
      }
    })
    console.log(actData)
    if (actData)
      await this.activitiesService.bulkUpdate(actData)

    return this.findOne(create.id)
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
