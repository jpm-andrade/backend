import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { Public } from 'src/auth/strategy/public-strategy';


@Public()
@Controller('activity-type')
export class ActivityTypeController {
  constructor(private readonly activityTypeService: ActivityTypeService) {}

  @Post()
  create(@Body() createActivityTypeDto: CreateActivityTypeDto) {
    return this.activityTypeService.create(createActivityTypeDto);
  }

  @Get()
  findAll() {
    return this.activityTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityTypeService.findOne(+id);
  }

  @Get('/shop/:id')
  findByShopId(@Param('id') id: string) {
    return this.activityTypeService.findBasedOnShop(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActivityTypeDto: UpdateActivityTypeDto) {
    return this.activityTypeService.update(+id, updateActivityTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityTypeService.remove(+id);
  }
}
