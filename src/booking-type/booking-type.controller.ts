import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingTypeService } from './booking-type.service';
import { CreateBookingTypeDto } from './dto/create-booking-type.dto';
import { UpdateBookingTypeDto } from './dto/update-booking-type.dto';
import { Public } from 'src/auth/strategy/public-strategy';


@Public()
@Controller('booking-type')
export class BookingTypeController {
  constructor(private readonly bookingTypeService: BookingTypeService) {}

  @Post()
  create(@Body() createBookingTypeDto: CreateBookingTypeDto) {
    return this.bookingTypeService.create(createBookingTypeDto);
  }

  @Get()
  findAll() {
    return this.bookingTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingTypeService.findBasedOnShop(+id);
  }

  @Get('/shop/:id')
  findByShopId(@Param('id') id: string) {
    return this.bookingTypeService.findBasedOnShop(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingTypeDto: UpdateBookingTypeDto) {
    return this.bookingTypeService.update(+id, updateBookingTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingTypeService.remove(+id);
  }
}
