import { ApiProperty } from "@nestjs/swagger";

export class BaseBooking {
    @ApiProperty()
    id?: number;
 
    @ApiProperty()
    checkInDate: Date;
  
    @ApiProperty()
    certificationLevel?: string;
  
    @ApiProperty()
    language: string
  
    @ApiProperty()
    country: string;
  
    @ApiProperty()
    referedFrom: string;
  
    @ApiProperty({ default: false })
    isCanceled: boolean

    @ApiProperty()
    shopId: number;
  
    @ApiProperty()
    customerId: number;

}