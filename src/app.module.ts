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
import { join } from 'path';
import { LanguagesModule } from './languages/languages.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizedShopsModule } from './authorized-shops/authorized-shops.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password:'root',
      database: 'be-db',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      autoLoadEntities:true,
      //dropSchema:true,
      //debug: true
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
    ActivityTypeModule,
    LanguagesModule,
    AuthModule,
    AuthorizedShopsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
