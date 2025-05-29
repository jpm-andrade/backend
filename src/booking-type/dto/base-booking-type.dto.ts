import { ApiProperty } from "@nestjs/swagger";

export class BaseBookingType {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    label: string;

    @ApiProperty()
    organizationId: number;
}