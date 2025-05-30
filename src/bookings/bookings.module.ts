import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Activity } from 'src/activities/entities/activity.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { BookingType } from 'src/booking-type/entities/booking-type.entity';
import { ActivitiesModule } from 'src/activities/activities.module';
import { CustomersModule } from 'src/customers/customers.module';
import { ShopsModule } from 'src/shops/shops.module';
import { BookingTypeModule } from 'src/booking-type/booking-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Booking,
    Shop,
    Customer,
    BookingType
  ]),
  CustomersModule,
  ShopsModule,
  BookingTypeModule
],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService]
})
export class BookingsModule {}
