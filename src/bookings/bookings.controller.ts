import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Public } from 'src/auth/strategy/public-strategy';


@Public()
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('/customer/shop/:id')
  findForCustomerTable(@Param('id') id: string) {
    return this.bookingsService.findForCustomersTable(+id);
  }

  @Get('/customer/:id')
  findForCustomerTableDetails(@Param('id') id: string) {
    return this.bookingsService.findForCustomerDetailTable(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Get('/shop/:id')
  findByShop(@Param('id') id: string) {
    return this.bookingsService.findByShop(+id);
  }

  @Get('/organization/:id')
  findByOrganization(@Param('id') id: string) {
    return this.bookingsService.findByShop(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
