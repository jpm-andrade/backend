import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityInternal } from './dto/create-activity-internal.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { startOfMonth, endOfMonth, format } from 'date-fns';

@Injectable()
export class ActivitiesService {

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

  ) { }

  /**
   * 
   * @param createActivityDto 
   * @returns 
   */
  async create(createActivityDto: CreateActivityDto) {
    const activity = new Activity()

    const employee = await this.employeeRepository.findOneBy({ id: createActivityDto.employeeId })

    if (!employee) {
      throw new NotFoundException(`Employee ${createActivityDto.employeeId} not found`);
    }

    const booking = await this.bookingRepository.findOneBy({ id: createActivityDto.bookingId })

    if (!booking) {
      throw new NotFoundException(`Booking ${createActivityDto.bookingId} not found`);
    }

    activity.employee = employee
    activity.booking = booking
    activity.price = createActivityDto.price


    return this.activityRepository.save(activity)
  }

  /**
   * 
   * @param createActivityDto 
   * @returns 
   */
  async createInternal(createActivityDto: CreateActivityInternal) {
    const activity = new Activity()

    const employee = await this.employeeRepository.findOneBy({ id: createActivityDto.employeeId })

    if (!employee) {
      throw new NotFoundException(`Employee ${createActivityDto.employeeId} not found`);
    }

    activity.employee = employee
    activity.booking = createActivityDto.booking
    activity.price = createActivityDto.price

    return this.activityRepository.save(activity)
  }

  /**
   * 
   * @param createBulkActivityDto 
   */
  async bulkCreate(createBulkActivityDto: CreateActivityInternal[]) {
    try {
      await Promise.all(createBulkActivityDto.map(async (activity) => {
        await this.createInternal(activity)
      })
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async bulkUpdate(createBulkActivityDto: CreateActivityInternal[]) {
    try {
      await Promise.all(
        createBulkActivityDto.map(async (activity) => {
          await this.activityRepository.save(activity)
        })
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async calculateMonthlyEmployeeWages(shopId: number) {
    const activities = await this.activityRepository.find({
      relations: {
        employee: { role: true },
        booking: true,
      },
      where: {
        booking: {
          shop: { id: shopId },
          isCanceled: false,
        },
      },
    });

    const grouped: Record<string, Record<number, {
      id: number;
      name: string;
      role: string;
      total: number;
    }>> = {};

    for (const activity of activities) {
      const { employee, booking } = activity;
      if (!employee || !booking) continue;

      const month = format(new Date(booking.checkInDate), 'yyyy-MM');

      const employeeId = employee.id;
      const employeeKey = `${employeeId}`;

      if (!grouped[month]) grouped[month] = {};
      if (!grouped[month][employeeId]) {
        grouped[month][employeeId] = {
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          role: employee.role?.name || 'N/A',
          total: 0,
        };
      }

      if (employee.freelancer) {
        grouped[month][employeeId].total += employee.fixedRate ?? 0;
      } else {
        const discount = booking.discount ?? 0;
        const serviceCost = booking.serviceCost ?? 0;

        const discountedPrice =
          activity.price - serviceCost - (activity.price * discount) / 100;

        grouped[month][employeeId].total += Math.max(discountedPrice, 0);
      }
    }

    // Format result
    return Object.entries(grouped).map(([month, employeesMap]) => ({
      month,
      employees: Object.values(employeesMap),
    }));
  }


  findAll() {
    return this.activityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
