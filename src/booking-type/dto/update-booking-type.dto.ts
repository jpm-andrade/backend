import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingTypeDto } from './create-booking-type.dto';

export class UpdateBookingTypeDto extends PartialType(CreateBookingTypeDto) {}
