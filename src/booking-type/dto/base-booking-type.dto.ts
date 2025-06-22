import { ApiProperty } from "@nestjs/swagger";

export class BaseBookingType {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    label: string;

    @ApiProperty()
    shopId: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    packageDeal:boolean

    @ApiProperty()
    isCourse:boolean

    @ApiProperty()
    needsCert: boolean

    @ApiProperty()
    actvityLimit?:number
    
    @ApiProperty()
    serviceCost?: number

    @ApiProperty()
    isActive?: boolean
}