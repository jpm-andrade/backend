import { ApiProperty } from "@nestjs/swagger";

export class BaseActivityType {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    label: string;

    @ApiProperty()
    shopId: number

}