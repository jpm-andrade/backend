import { ApiProperty } from "@nestjs/swagger";

export class BaseActivity {
    @ApiProperty({
        description: 'Auto-generated unique identifier of the booking',
        example: 123,
    })
    id?: number;

    @ApiProperty()
    employeeId: number;

    @ApiProperty()
    bookingId: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    price: number;
}