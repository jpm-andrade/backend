import { Module } from '@nestjs/common';
import { EmployeeRolesService } from './employee-roles.service';
import { EmployeeRolesController } from './employee-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRole } from './entities/employee-role.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeRole, Shop])],
  controllers: [EmployeeRolesController],
  providers: [EmployeeRolesService],
})
export class EmployeeRolesModule {}
