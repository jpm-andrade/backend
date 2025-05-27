import { ApiProperty } from "@nestjs/swagger";

export class BaseOrganization {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;
}