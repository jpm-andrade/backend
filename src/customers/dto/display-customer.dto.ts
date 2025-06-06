import { ApiProperty } from "@nestjs/swagger"


export class DisplayCustomer {
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    status: "booked" | "checking" | "dived" | "runaway"
    @ApiProperty()
    checkInDate: string
    @ApiProperty()
    birthDate: string
    @ApiProperty()
    country: string
}