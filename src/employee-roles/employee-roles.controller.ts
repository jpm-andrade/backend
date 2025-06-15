import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeRolesService } from './employee-roles.service';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { EmployeeRole } from './entities/employee-role.entity';
import { Public } from 'src/auth/strategy/public-strategy';

@Public()
@ApiTags('Employee Roles')
@Controller('employee-roles')
export class EmployeeRolesController {
  constructor(private readonly service: EmployeeRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee role' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: EmployeeRole })
  create(@Body() dto: CreateEmployeeRoleDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employee roles' })
  @ApiResponse({ status: 200, description: 'List of roles', type: [EmployeeRole] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role found', type: EmployeeRole })
  @ApiResponse({ status: 404, description: 'Role not found' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('/shop/:id')
  @ApiOperation({ summary: 'Get a roles by shop ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role found', type: EmployeeRole })
  @ApiResponse({ status: 404, description: 'Role not found' })
  findByShop(@Param('id') id: number) {
    return this.service.findByShop(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing employee role' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  update(@Param('id') id: number, @Body() dto: UpdateEmployeeRoleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee role' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
