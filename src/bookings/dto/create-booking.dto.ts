import { BaseBooking } from "./base-booking.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BaseActivity } from "src/activities/dto/base-activity.dto";


export class CreateBookingDto extends BaseBooking{

    @ApiProperty()
    activities: BaseActivity[];
  
    @ApiProperty()
    bookingTypeId: number;
}
