import { ApiProperty } from "@nestjs/swagger";

export class BaseBooking {
    @ApiProperty({
        description: 'Date and time when the booking begins (ISO 8601)',
        example: '2025-07-01T14:00:00.000Z',
        type: String,
        format: 'date-time',
    })
    id?: number;

    @ApiProperty({
        description: 'Date and time when the booking begins (ISO 8601)',
        example: '2025-07-01T14:00:00.000Z',
        type: String,
        format: 'date-time',
    })
    checkInDate: Date;

    @ApiProperty({
        description: 'Certification level required for this booking (e.g. Open Water)',
        example: 'Open Water',
        required: false,
    })
    certificationLevel?: string;

    @ApiProperty({
        description: 'Language code selected for this booking (ISO 639-1)',
        example: 'English',
    })
    language: string

    @ApiProperty({
        description: 'Shop identifier',
        example: 1
    })
    shopId: number;

    @ApiProperty({
        description: 'Customer identifier',
        example: 1
    })
    customerId: number;

    @ApiProperty({
        description: 'Total price of the booking in USD',
        example: 250.5,
    })
    price: number;

    @ApiProperty({
        description: 'Discount applied to this activity in USD',
        example: 5.0,
        default: 0,
    })
    discount: number;

    @ApiProperty({
        description: 'Deposit collected for this activity in USD',
        example: 10.0,
        default: 0,
    })
    deposit: number;    

}