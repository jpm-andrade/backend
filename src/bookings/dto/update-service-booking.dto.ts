import { ApiProperty } from "@nestjs/swagger";

export class UpdateServiceBooking {
    @ApiProperty({
        description: 'Service cost',
        example: 1
    })
    serviceCost: number;

    @ApiProperty({
        description: 'Identifier of the booking type',
        example: 7,
    })
    bookingTypeId?: number;



}