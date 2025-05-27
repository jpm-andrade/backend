import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Language } from 'src/languages/entities/language.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Language, User,])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
