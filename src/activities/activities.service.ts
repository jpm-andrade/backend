import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityInternal } from './dto/create-activity-internal.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { ActivityType } from 'src/activity-type/entities/activity-type.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class ActivitiesService {

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(ActivityType)
    private readonly activityTypeRepository: Repository<ActivityType>,
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

    const employee = await this.employeeRepository.findOneBy({id:createActivityDto.employeeId})

    if (!employee) {
      throw new NotFoundException(`Employee ${createActivityDto.employeeId} not found`);
    }

    const activityType = await this.activityTypeRepository.findOneBy({id:createActivityDto.activityTypeId})

    if (!activityType) {
      throw new NotFoundException(`Activity Type ${createActivityDto.activityTypeId} not found`);
    }

    const booking = await this.bookingRepository.findOneBy({id:createActivityDto.bookingId})

    if (!booking) {
      throw new NotFoundException(`Booking ${createActivityDto.bookingId} not found`);
    }

    activity.employee = employee
    activity.activityType = activityType
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

    const employee = await this.employeeRepository.findOneBy({id:createActivityDto.employeeId})

    if (!employee) {
      throw new NotFoundException(`Employee ${createActivityDto.employeeId} not found`);
    }

    const activityType = await this.activityTypeRepository.findOneBy({id:createActivityDto.activityTypeId})

    if (!activityType) {
      throw new NotFoundException(`Activity Type ${createActivityDto.employeeId} not found`);
    }

    activity.employee = employee
    activity.activityType = activityType
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
      throw new Error()
    }
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
