import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsModule } from 'src/organizations/organizations.module';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Shop,
        Employee,
        Organization
      ]
    ),
  OrganizationsModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports:[ShopsService]
})
export class ShopsModule { }
