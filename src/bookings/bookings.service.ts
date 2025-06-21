import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { ActivitiesService } from 'src/activities/activities.service';
import { CreateActivityInternal } from 'src/activities/dto/create-activity-internal.dto';
import { CustomerDetailsBookingTable } from './dto/customers-table-booking.dto';
import { DisplayCustomerBooking } from './dto/display-customer-booking.dto';
import { BulkCreateBookingDto } from './dto/create-bulk-booking.dto';
import { BareActivitiesDTO, BareBookingDTO } from './dto/ui-bare-booking.dto';

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


  /**
   * 
   * @param createBookingDto 
   * @returns 
   */
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
    booking.deposit = createBookingDto.deposit
    booking.discount = createBookingDto.discount
    if (createBookingDto.price)
      booking.value = createBookingDto.price + ((createBookingDto.price * createBookingDto.discount) / 100) + createBookingDto.deposit

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

  /**
   * 
   * @param createBookingDto 
   */
  createBulk(createBookingDto: BulkCreateBookingDto) {
    console.log(createBookingDto)
    try {
      Promise.all(createBookingDto.customerIdList.map(async (customer) => {
        createBookingDto.customerId = customer
        console.log(createBookingDto)
        await this.create(createBookingDto)
      })
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }

  }

  /**
   * 
   * @returns 
   */
  findAll() {
    return this.bookingRepository.find({
      relations: {
        activities: true
      }
    });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
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

  /**
   * 
   * @param id 
   * @returns 
   */
  async findBookingById(id: number): Promise<BareBookingDTO> {
    const booking = await this.bookingRepository.findOne(
      {
        relations: {
          customer: true,
          activities: {
            employee: true
          },
          shop: true

        },
        where: {
          id: id
        }
      });

    if (!booking)
      return {} as BareBookingDTO

    let price = 0
    if (booking.activities.length != 0) {
      price = booking.activities.reduce((acc, act) => { return acc + act.price }, 0)
    }

    return {
      id: booking.id,
      bookingTypeId: booking.bookingType.id,
      checkInDate: booking.checkInDate,
      customerId: booking.customer.id,
      deposit: booking.deposit,
      discount: booking.discount,
      language: booking.language,
      price: price,
      shopId: booking.shop.id,
      certificationLevel: booking.certificationLevel,
      activities: booking.activities.map<BareActivitiesDTO>((act) => {
        return {
          date: booking.checkInDate,
          employeeId: act.employee.id,
          price: act.price,
          id: act.id
        }
      }),
    }

  }

  /**
   * 
   * @param id 
   * @returns 
   */
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

  /**
   * 
   * @param shopId 
   * @returns 
   */
  /**
     * Return exactly one (the latest) booking per customer for this shop,
     * even on MySQL.
     */
  async findForCustomersTable(
    shopId: number,
  ): Promise<DisplayCustomerBooking[]> {
    const qb = this.bookingRepository
      .createQueryBuilder("booking")
      // bring in all the relations you need
      .leftJoinAndSelect("booking.customer", "customer")
      .leftJoinAndSelect("booking.bookingType", "bookingType")
      .leftJoinAndSelect("booking.activities", "activities")
      // only this shop
      .where("booking.shopId = :shopId", { shopId })
      // only keep the booking whose id is the most recent for that customer
      .andWhere((qb) => {
        const sub = qb
          .subQuery()
          .select("b2.id")
          .from(Booking, "b2")
          .where("b2.customerId = booking.customerId")
          .andWhere("b2.shopId = :shopId", { shopId })
          .orderBy("b2.checkInDate", "DESC")
          .limit(1)
          .getQuery();
        // this turns into: booking.id = ( SELECT b2.id ... LIMIT 1 )
        return "booking.id = " + sub;
      })
      // optional: ensure consistent ordering in case you paginate or just want newest first
      .orderBy("booking.checkInDate", "DESC");

    const latestBookings = await qb.getMany();

    return latestBookings.map((b) => ({
      customerId: b.customer.id,
      name: `${b.customer.firstName} ${b.customer.lastName}`,
      status: b.activities.length === 0 ? "Check in" : "Booked",
      activity: b.bookingType?.label ?? "",
      date: b.checkInDate,
      lastBookingType: b.bookingType?.label ?? "",
      bookingId: b.id,
    }));
  }

  /**
   * 
   * @param id 
   * 
   * @returns 
   */
  async getBookingsWithActivities(id: number): Promise<any[]> {
    const bookings = await this.bookingRepository.find({
      relations: [
        'bookingType',            // BookingType { id, label, … } :contentReference[oaicite:0]{index=0}
        'activities',             // Activity[] :contentReference[oaicite:1]{index=1}
        'activities.employee',    // Employee on each Activity :contentReference[oaicite:2]{index=2}
      ],
      where: {
        shop: {
          id: id
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
   * @param month 
   * @param year 
   * @param id 
   * @returns 
   */
  async getMonthlyStats(month: number, year: number, id: number) {
    // build start/end of month
    const start = new Date(year, month - 1, 1, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const previousMonthStart = new Date(year, month - 1 - 1, 1, 0, 0, 0);
    const previousMonthEnd = new Date(year, month - 1, 0, 23, 59, 59, 999);

    /**
     * Total booking for this month
     */
    const totalBookings = await this.bookingRepository.count({
      where: {
        shop: {
          id: id
        },
        createdAt: Between(start, end)
      },
    });

    /**
     * Total booking for last month 
     */
    const totalPreviousMonthBookings = await this.bookingRepository.count({
      where: {
        shop: {
          id: id
        },
        createdAt: Between(previousMonthStart, previousMonthEnd)
      },
    });

    /**
     * Trend of the booking values
     */
    const bookingTrend = totalPreviousMonthBookings === 0 ? 0 : (100 * (totalBookings - totalPreviousMonthBookings) / totalPreviousMonthBookings)


    /**
     * New Customers registered this month
     */
    const newCustomers = await this.bookingRepository.count({
      relations: {
        customer: true
      },
      where: {
        shop: {
          id: id
        },
        customer: { createdAt: Between(start, end) }
      },
    });


    const lastMonthCustomers = await this.bookingRepository.count({
      relations: {
        customer: true
      },
      where: {
        shop: {
          id: id
        },
        customer: { createdAt: Between(previousMonthStart, previousMonthEnd) }
      },
    });

    const customerTrend = lastMonthCustomers === 0 ? 0 : 100 * (newCustomers - lastMonthCustomers) / lastMonthCustomers

    /**
     * Sum of the booking values to obtain gross income
     */
    const { sum: rawGross } = await this.bookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.value)', 'sum')
      .where('b.createdAt BETWEEN :start AND :end', { start, end })
      .where('b.shopId = :id', { id })
      .getRawOne();
    const totalGrossIncome = parseFloat(rawGross) || 0;

    const { sum: lastMonthRawGross } = await this.bookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.value)', 'sum')
      .where('b.createdAt BETWEEN :start AND :end', { previousMonthStart, previousMonthEnd })
      .where('b.shopId = :id', { id })
      .getRawOne();
    const lastMonthGrossIncome = parseFloat(lastMonthRawGross) || 0;

    const incomeTrend = lastMonthGrossIncome === 0 ? 0 : 100 * (totalGrossIncome - lastMonthGrossIncome) / lastMonthGrossIncome


    const { sum: rawComm } = await this.bookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.serviceCost)', 'sum')
      .where('b.createdAt BETWEEN :start AND :end', { start, end })
      .where('b.shopId = :id', { id })
      .getRawOne();
    const totalCommissions = parseFloat(rawComm) || 0;

    const { sum: lastMonthRawComm } = await this.bookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.serviceCost)', 'sum')
      .where('b.createdAt BETWEEN :start AND :end', { previousMonthStart, previousMonthEnd })
      .where('b.shopId = :id', { id })
      .getRawOne();
    const lastMonthCommissions = parseFloat(lastMonthRawComm) || 0;

    const commissionTrend = lastMonthCommissions === 0 ? 0 : 100 * (totalCommissions - lastMonthCommissions) / lastMonthCommissions


    return {
      totalBookings,
      bookingTrend,
      newCustomers,
      customerTrend,
      totalGrossIncome,
      incomeTrend,
      totalCommissions,
      commissionTrend
    };
  }


  /**
 * Returns the count of bookings per day (grouped by DATE) broken down by bookingType.category.
 * Compatible with MySQL.
 */
  async getBookingsByDay(shopId: number, startDate?: string, endDate?: string) {
    const now = new Date();
    const start = startDate
      ? new Date(startDate + 'T00:00:00')
      : new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    const end = endDate
      ? new Date(endDate + 'T23:59:59.999')
      : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const qb = this.bookingRepository
      .createQueryBuilder('b')
      .innerJoin('b.bookingType', 'bt')
      .select("DATE(b.checkInDate)", 'day')
      .addSelect('bt.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('b.checkInDate BETWEEN :start AND :end', { start, end });

    if (shopId) {
      qb.andWhere('b.shopId = :shopId', { shopId });
    }

    const raw = await qb
      .groupBy("DATE(b.checkInDate)")
      .addGroupBy('bt.category')
      .orderBy('day')
      .getRawMany();

    const map = new Map<string, Record<string, any>>();
    for (const row of raw) {
      // Handle MySQL DATE() returning a JS Date or a string
      const dayValue = row.day;
      let dateObj: Date;

      if (dayValue instanceof Date) {
        dateObj = dayValue;
      } else {
        const [year, month, day] = (dayValue as string).split('-').map(Number);
        dateObj = new Date(year, month - 1, day);

      }

      const label = dateObj.toISOString().split('T')[0]


      if (!map.has(label)) {
        map.set(label, { date: label });
      }
      const entry = map.get(label)!;
      entry[row.category.toLowerCase()] = parseInt(row.count, 10);
    }

    return Array.from(map.values());
  }



  /**
   * 
   * @param id 
   * @returns 
   */
  async getTodayStats(id: number) {
    const now = new Date();

    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const previousDaysStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
    const previousDayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);

    // 1) bookings scheduled for today
    const bookingsToday = await this.bookingRepository.count({
      relations: {
        shop: true
      },
      where: {
        shop: {
          id: id
        },
        checkInDate: Between(start, end)
      },
    });

    // 1) bookings scheduled for today
    const bookingsYesterday = await this.bookingRepository.count({
      relations: {
        shop: true
      },
      where: {
        shop: {
          id: id
        },
        checkInDate: Between(previousDaysStart, previousDayEnd)
      },
    });

    const bookingTrend = bookingsYesterday === 0 ? 0 : (100 * (bookingsToday - bookingsYesterday) / bookingsYesterday)

    // 2) bookings created (registered) today
    const registeredToday = await this.bookingRepository.count({
      relations: {
        shop: true
      },
      where: {
        shop: {
          id: id
        }, createdAt: Between(start, end)
      },
    });

    // 2) bookings created (registered) today
    const registeredYesterday = await this.bookingRepository.count({
      relations: {
        shop: true
      },
      where: {
        shop: {
          id: id
        }, createdAt: Between(start, end)
      },
    });

    const registrationTrend = registeredYesterday === 0 ? 0 : (100 * (registeredToday - registeredYesterday) / registeredYesterday)



    // 3) waiting for check-in: scheduled today, but no activities
    const waitingCheckIn = await this.bookingRepository
      .createQueryBuilder('b')
      .leftJoin('b.activities', 'a')
      .where('b.shopId = :id', { id })
      .andWhere('a.id IS NULL')
      .getCount();

    // 4) total gross income from bookings created today
    const { sum: rawGross } = await this.bookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.value)', 'sum')
      .where('b.createdAt BETWEEN :start AND :end', { start, end })
      .where('b.shopId = :id', { id })
      .getRawOne();
    const totalGrossIncomeToday = parseFloat(rawGross) || 0;

    // 4) total gross income from bookings created today
    const { sum: rawYesterdayGross } = await this.bookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.value)', 'sum')
      .where('b.createdAt BETWEEN :start AND :end', { previousDaysStart, previousDayEnd })
      .where('b.shopId = :id', { id })
      .getRawOne();
    const totalGrossIncomeYesterday = parseFloat(rawGross) || 0;

    const incomeTrend = totalGrossIncomeYesterday === 0 ? 0 : (100 * (totalGrossIncomeToday - totalGrossIncomeYesterday) / totalGrossIncomeYesterday)

    return {
      waitingCheckIn,
      bookingsToday,
      bookingTrend,
      registeredToday,
      registrationTrend,
      totalGrossIncomeToday,
      incomeTrend
    };
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

  /**
   * 
   * @param id 
   * @param updateBookingDto 
   * @returns 
   */
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
    if (updateBookingDto.price)
      booking.value = updateBookingDto.price + ((updateBookingDto.price * updateBookingDto.discount) / 100) + updateBookingDto.deposit



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

  /**
   * 
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
