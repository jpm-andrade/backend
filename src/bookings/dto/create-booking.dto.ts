import { BaseBooking } from "./base-booking.dto";
import { ApiProperty } from "@nestjs/swagger";
import { CreateActivityDto } from "src/activities/dto/create-activity.dto";


export class CreateBookingDto extends BaseBooking{

    @ApiProperty()
    activities: CreateActivityDto[];
  
    @ApiProperty()
    bookingTypeId: number;
}
