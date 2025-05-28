import { ApiProperty } from "@nestjs/swagger";

export class BaseCustomer {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    referedFrom: string;

    @ApiProperty()
    organizationId: number;
}