import { BaseBookingType } from "./base-booking-type.dto";

export class CreateBookingTypeDto extends BaseBookingType {
    createdAt: Date;
}
