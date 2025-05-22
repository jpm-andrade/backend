import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { EmployeesModule } from './employees/employees.module';
import { CustomersModule } from './customers/customers.module';
import { ReferalAgentModule } from './referal-agent/referal-agent.module';
import { ActivitiesModule } from './activities/activities.module';
import { ShopsModule } from './shops/shops.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [UsersModule, OrganizationsModule, EmployeesModule, CustomersModule, ReferalAgentModule, ActivitiesModule, ShopsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
