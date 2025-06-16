import { ApiProperty } from "@nestjs/swagger";


export class DisplayCustomerBooking {
    customerId:number
    customerName: string
    status: string;
    lastBookingDate: Date;
    lastBookingType: string
}