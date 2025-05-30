import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto extends CreateBookingDto {
    @ApiProperty({ default: false })
    isCanceled: boolean
}
