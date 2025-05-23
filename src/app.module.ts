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
import { BookingTypeModule } from './booking-type/booking-type.module';
import { ActivityTypeModule } from './activity-type/activity-type.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    OrganizationsModule,
    EmployeesModule,
    CustomersModule,
    ReferalAgentModule,
    ActivitiesModule,
    ShopsModule,
    BookingsModule,
    BookingTypeModule,
    ActivityTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
