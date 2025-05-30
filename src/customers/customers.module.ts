import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Customer, 
    Organization, 
    User
  ]),
  OrganizationsModule
],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule { }
