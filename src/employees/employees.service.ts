import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeLanguage } from 'src/employee-languages/entities/employee-language.entity';
import { Language } from 'src/languages/entities/language.entity';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeLanguage)
    private readonly employeeLanguageRepository: Repository<EmployeeLanguage>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,


  ) { }


  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee()

    employee.firstName = createEmployeeDto.firstName
    employee.lastName = createEmployeeDto.lastName
    employee.dateOfBirth = createEmployeeDto.dateOfBirth
    employee.gender = createEmployeeDto.gender
    employee.country = createEmployeeDto.country

    const savedEmployee = await this.employeeRepository.save(employee)

    createEmployeeDto.languageIds?.map(async (id) => {
      let language = await this.languageRepository.findOneBy({
        id: id
      })

      if (language)
        await this.employeeLanguageRepository.save({
          employee: savedEmployee,
          language: language
        })
    })


    return this.employeeRepository.findOneBy({id:savedEmployee.id});
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOneBy({ id: id });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
