import { Module } from '@nestjs/common';
import { BookingTypeService } from './booking-type.service';
import { BookingTypeController } from './booking-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingType } from './entities/booking-type.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingType, Shop]),
    ShopsModule
  ],
  controllers: [BookingTypeController],
  providers: [BookingTypeService],
  exports:[BookingTypeService]
})
export class BookingTypeModule { }
