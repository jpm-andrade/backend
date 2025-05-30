import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeLanguagesService } from './employee-languages.service';
import { CreateEmployeeLanguageDto } from './dto/create-employee-language.dto';
import { UpdateEmployeeLanguageDto } from './dto/update-employee-language.dto';

@Controller('employee-languages')
export class EmployeeLanguagesController {
  constructor(private readonly employeeLanguagesService: EmployeeLanguagesService) {}

  @Post()
  create(@Body() createEmployeeLanguageDto: CreateEmployeeLanguageDto) {
    return this.employeeLanguagesService.create(createEmployeeLanguageDto);
  }

  @Get()
  findAll() {
    return this.employeeLanguagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeLanguagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeLanguageDto: UpdateEmployeeLanguageDto) {
    return this.employeeLanguagesService.update(+id, updateEmployeeLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeLanguagesService.remove(+id);
  }
}
