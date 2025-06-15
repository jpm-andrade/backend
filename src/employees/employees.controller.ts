import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Public } from 'src/auth/strategy/public-strategy';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@Public()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('/shop/:id')
  findByShop(@Param('id') id: string) {
    return this.employeesService.findByShop(+id);
  }

  @Get('/list/:shopId')
  findForList(@Param('shopId') id: string) {
    return this.employeesService.findByShopForList(+id);
  }

  @Get('/organization/:id')
  findByOrganization(@Param('id') id: string) {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Get('by-role/:roleId')
  @ApiOperation({ summary: 'Find employees by role ID' })
  @ApiParam({
    name: 'roleId',
    type: Number,
    description: 'The ID of the employee role',
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'Employees with the specified role ID',
    type: [Employee],
  })
  findByRole(@Param('roleId') roleId: number) {
    return this.employeesService.findByRole(roleId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
