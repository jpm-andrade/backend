import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Public } from 'src/auth/strategy/public-strategy';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetBookingsByDayDto } from './dto/dashboard-chart.dto';
import { TodayStatsDto } from './dto/daily-stats.dto';
import { BulkCreateBookingDto } from './dto/create-bulk-booking.dto';



@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }


  @Public()
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }


  @Post("/bulk")
  createBulk(
    @Body() bulkcreateBookingDto: BulkCreateBookingDto
    ) {
    return this.bookingsService.createBulk(bulkcreateBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }
  
  @Public()
  @Get('/customer/shop/:id')
  findForCustomerTable(@Param('id') id: string) {
    return this.bookingsService.findForCustomersTable(+id);
  }

  @Get('/customer/:id')
  findForCustomerTableDetails(@Param('id') id: string) {
    return this.bookingsService.findForCustomerDetailTable(+id);
  }

  @Get('activities-page/shop/:id')
  async getActivitiesPageData(@Param('id') id: string) {
    return this.bookingsService.getBookingsWithActivities(+id);
  }


  @Public()
  @Get('monthly/shop/:id')
  @ApiOperation({ summary: 'Get monthly statistics: total bookings, new customers, gross income & total commissions' })
  @ApiQuery({ name: 'month', type: Number, required: false, description: 'Month number (1-12), defaults to current month' })
  @ApiQuery({ name: 'year', type: Number, required: false, description: 'Year (e.g. 2025), defaults to current year' })
  @ApiParam({ name: 'id', type: Number, required: true, description: 'ShopId' })
  async getMonthly(
    @Param('id') id: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    const now = new Date();
    const m = month ? +month : now.getMonth() + 1;
    const y = year ? +year : now.getFullYear();
    return this.bookingsService.getMonthlyStats(m, y, +id);
  }

  @Get('today/shop/:id')
  @ApiOperation({ summary: 'Get today’s stats: waiting check-in, bookings today, registered today & gross income' })
  @ApiParam({ name: 'id', type: Number, required: true, description: 'ShopId' })
  @ApiOkResponse({ type: TodayStatsDto })
  async getToday(
    @Param('id') id: string,
  ): Promise<TodayStatsDto> {
    return this.bookingsService.getTodayStats(+id);
  }

  @Public()
  @Get('chart/dashboard/:shopId')
  @ApiOperation({ summary: 'Get daily booking counts grouped by booking category' })
  @ApiParam({ name: 'id', type: Number, required: true, description: 'ShopId' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date filter (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date filter (YYYY-MM-DD)' })
  @ApiOkResponse({ description: 'Array of objects with day names and counts per category' })
  async getBookingsByDay(
    @Param('id') id: string,
    @Query() query: GetBookingsByDayDto,
  ) {
    return this.bookingsService.getBookingsByDay( +id, query.startDate, query.endDate);
  }


  @Public()
  @Get('general/:id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Public()
  @Get(':id')
  findBookingById(@Param('id') id: string) {
    return this.bookingsService.findBookingById(+id);
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
