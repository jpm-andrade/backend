import { ApiProperty } from "@nestjs/swagger";


export class CustomerDetailsBookingTable {
    id:number;
    customerId:number;
    date: Date;
    employeeName: string;
    category:string;
    activity: string;
    price: number
}