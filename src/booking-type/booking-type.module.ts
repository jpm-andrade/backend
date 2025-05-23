import { Module } from '@nestjs/common';
import { BookingTypeService } from './booking-type.service';
import { BookingTypeController } from './booking-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingType } from './entities/booking-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingType])],
  controllers: [BookingTypeController],
  providers: [BookingTypeService],
})
export class BookingTypeModule { }
