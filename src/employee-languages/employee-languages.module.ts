import { Module } from '@nestjs/common';
import { EmployeeLanguagesService } from './employee-languages.service';
import { EmployeeLanguagesController } from './employee-languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/languages/entities/language.entity';
import { EmployeeLanguage } from './entities/employee-language.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { LanguagesModule } from 'src/languages/languages.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Language,
        EmployeeLanguage,
        Employee
      ]
    )
  ],
  controllers: [EmployeeLanguagesController],
  providers: [EmployeeLanguagesService],
  exports:[EmployeeLanguagesService]
})
export class EmployeeLanguagesModule { }
