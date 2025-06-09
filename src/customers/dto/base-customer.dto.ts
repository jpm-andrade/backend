import { ApiProperty } from "@nestjs/swagger";
import { BaseBooking } from "src/bookings/dto/base-booking.dto";

export class BaseCustomer {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty() 
    lastName: string;

    @ApiProperty()
    dateOfBirth: Date;

    @ApiProperty()
    country: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    phoneNumber:string

    @ApiProperty()
    referedFrom: string;
}