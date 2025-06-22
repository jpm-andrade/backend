import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Public } from 'src/auth/strategy/public-strategy';
import { UpdateServiceActivity } from './dto/update-service-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }
  
  @Public()
  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Public()
  @Get('/wages/:id')
  findWages(@Param('id') id: string) {
    return this.activitiesService.calculateMonthlyEmployeeWages(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(+id, updateActivityDto);
  }

  @Put('/service-update/:id')
  updateService(@Param('id') id: string, @Body() updateActivityDto: UpdateServiceActivity) {
    return this.activitiesService.updateService(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
