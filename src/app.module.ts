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
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as Joi from 'joi';
import { LanguagesModule } from './languages/languages.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizedShopsModule } from './authorized-shops/authorized-shops.module';
import { EmployeeLanguagesModule } from './employee-languages/employee-languages.module';
import { CertificationsModule } from './certifications/certifications.module';
import { EmployeeRolesModule } from './employee-roles/employee-roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppDataSource } from 'data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,                      // make ConfigService available app-wide
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,    // .env.development, .env.production, etc.
        `.env`,                            // fallback
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),

        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(3306),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        // … any other vars you need
      }),
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
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
    LanguagesModule,
    AuthModule,
    AuthorizedShopsModule,
    EmployeeLanguagesModule,
    CertificationsModule,
    EmployeeRolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
