import { ApiProperty } from "@nestjs/swagger";

export class BaseActivity {
    @ApiProperty()
    id?: number;
 
    @ApiProperty()
    employeeId: number;
  
    @ApiProperty()
    activityTypeId:number;
  
    @ApiProperty()
    bookingId: number;
    
    @ApiProperty()
    date: Date;
  
    @ApiProperty()
    price: number;
  
    @ApiProperty()
    discount: number;
  
    @ApiProperty()
    deposit: number;
  
    @ApiProperty()
    referedFrom: string;

}