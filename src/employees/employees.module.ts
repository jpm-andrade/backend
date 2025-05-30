import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Language } from 'src/languages/entities/language.entity';
import { User } from 'src/users/entities/user.entity';
import { EmployeeLanguage } from 'src/employee-languages/entities/employee-language.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Employee,
        Language,
        User,
        EmployeeLanguage,
        Shop
      ]
    )
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService]
})
export class EmployeesModule { }
