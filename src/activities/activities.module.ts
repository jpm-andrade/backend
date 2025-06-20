import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Activity,
    Employee,
    Booking
  ])
],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService]
})
export class ActivitiesModule {}
