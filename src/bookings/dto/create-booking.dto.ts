import { BaseBooking } from "./base-booking.dto";
import { ApiProperty } from "@nestjs/swagger";
import { CreateActivityDto } from "src/activities/dto/create-activity.dto";


export class CreateBookingDto extends BaseBooking {

    @ApiProperty({
        description: 'List of activities associated with this booking',
        type: () => CreateActivityDto,
        isArray: true,
    })
    activities?: CreateActivityDto[];

    @ApiProperty({
        description: 'Identifier of the booking type',
        example: 7,
    })
    bookingTypeId?: number;
}
