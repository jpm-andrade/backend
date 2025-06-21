import { ApiProperty } from "@nestjs/swagger";
import { CreateBookingDto } from "./create-booking.dto";


export class BulkCreateBookingDto extends CreateBookingDto {
    @ApiProperty({
        description: 'List of customer id associated with this booking',
        isArray: true,
    })
    customerIdList: number[];
}