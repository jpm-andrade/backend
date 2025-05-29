import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingTypeDto } from './create-booking-type.dto';
import { BaseBookingType } from './base-booking-type.dto';

export class UpdateBookingTypeDto extends BaseBookingType {}
