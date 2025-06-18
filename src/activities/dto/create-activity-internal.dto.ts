import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/bookings/entities/booking.entity";

export class CreateActivityInternal {
    @ApiProperty()
    id?: number;
 
    @ApiProperty()
    employeeId: number;
  
    @ApiProperty()
    activityTypeId?:number;
  
    @ApiProperty()
    booking: Booking;
    
    @ApiProperty()
    date: Date;
  
    @ApiProperty()
    price: number;

}