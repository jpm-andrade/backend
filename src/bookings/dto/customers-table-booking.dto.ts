import { ApiProperty } from "@nestjs/swagger";


export class CustomerDetailsBookingTable {
    id:number;
    date: Date;
    employeeName: string;
    category:string;
    activity: string;
    price: number
}