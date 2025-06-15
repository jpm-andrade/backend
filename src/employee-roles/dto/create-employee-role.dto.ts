import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeRoleDto {
  @ApiProperty({
    example: 'Dive Instructor',
    description: 'The name of the employee role',
  })
  name: string;
  @ApiProperty({
    example: 'ShopId',
    description: 'The identification of the shop',
  })
  shopId: number;
}
