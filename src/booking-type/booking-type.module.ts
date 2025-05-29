import { Module } from '@nestjs/common';
import { BookingTypeService } from './booking-type.service';
import { BookingTypeController } from './booking-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingType } from './entities/booking-type.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { Shop } from 'src/shops/entities/shop.entity';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingType, Shop]),
    ShopsModule
  ],
  controllers: [BookingTypeController],
  providers: [BookingTypeService],
})
export class BookingTypeModule { }
