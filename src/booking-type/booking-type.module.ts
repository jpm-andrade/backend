import { Module } from '@nestjs/common';
import { BookingTypeService } from './booking-type.service';
import { BookingTypeController } from './booking-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingType } from './entities/booking-type.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingType, Organization]),
    OrganizationsModule
  ],
  controllers: [BookingTypeController],
  providers: [BookingTypeService],
})
export class BookingTypeModule { }
