import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Shop,
        Employee,
        Organization
      ]
    ),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports:[ShopsService]
})
export class ShopsModule { }
