import { ApiProperty } from "@nestjs/swagger";

export class UpdateServiceActivity {
    @ApiProperty()
    employeeId: number;

    @ApiProperty()
    commissionValue: number;

    @ApiProperty()
    price: number;
}