import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Booking,
    Shop,
    Customer,
    BookingType
  ]),
  ActivitiesModule
],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService]
})
export class BookingsModule {}
