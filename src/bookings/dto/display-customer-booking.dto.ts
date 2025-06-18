import { ApiProperty } from "@nestjs/swagger";


export class DisplayCustomerBooking {
    customerId:number
    name: string
    status: string;
    date: Date;
    lastBookingType: string
}