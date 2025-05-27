import { ApiProperty } from "@nestjs/swagger";

export class BaseShop {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    organizationId: number;
}