import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeRoleDto } from './create-employee-role.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeRoleDto extends PartialType(CreateEmployeeRoleDto) {
  @ApiPropertyOptional({
    example: 'Dive Master',
    description: 'Optional updated name for the employee role',
  })
  name?: string;
}
