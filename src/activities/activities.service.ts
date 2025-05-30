import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { EmployeesService } from 'src/employees/employees.service';
import { ActivityTypeService } from 'src/activity-type/activity-type.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { CreateActivityInternal } from './dto/create-activity-internal.dto';

@Injectable()
export class ActivitiesService {

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly employeeService: EmployeesService,
    private readonly activityTypeService: ActivityTypeService,
    private readonly bookingsService: BookingsService

  ) { }

  /**
   * 
   * @param createActivityDto 
   * @returns 
   */
  async create(createActivityDto: CreateActivityDto) {
    const activity = new Activity()

    const employee = await this.employeeService.findOne(createActivityDto.employeeId)

    if (!employee) {
      throw Error()
    }

    const activityType = await this.activityTypeService.findOne(createActivityDto.activityTypeId)

    if (!activityType) {
      throw Error()
    }

    const booking = await this.bookingsService.findOne(createActivityDto.bookingId)

    if (!booking) {
      throw Error()
    }

    activity.employee = employee
    activity.activityType = activityType
    activity.booking = booking
    activity.date = createActivityDto.date
    activity.price = createActivityDto.price
    activity.discount = createActivityDto.discount
    activity.deposit = createActivityDto.discount
    activity.referedFrom = createActivityDto.referedFrom

    return this.activityRepository.save(activity)
  }

  /**
   * 
   * @param createActivityDto 
   * @returns 
   */
  async createInternal(createActivityDto: CreateActivityInternal) {
    const activity = new Activity()

    const employee = await this.employeeService.findOne(createActivityDto.employeeId)

    if (!employee) {
      throw Error()
    }

    const activityType = await this.activityTypeService.findOne(createActivityDto.activityTypeId)

    if (!activityType) {
      throw Error()
    }

    activity.employee = employee
    activity.activityType = activityType
    activity.booking = createActivityDto.booking
    activity.date = createActivityDto.date
    activity.price = createActivityDto.price
    activity.discount = createActivityDto.discount
    activity.deposit = createActivityDto.discount
    activity.referedFrom = createActivityDto.referedFrom

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
      throw new Error()
    }
  }


  findAll() {
    return `This action returns all activities`;
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
