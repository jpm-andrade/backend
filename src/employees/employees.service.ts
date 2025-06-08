import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeLanguage } from 'src/employee-languages/entities/employee-language.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeLanguage)
    private readonly employeeLanguageRepository: Repository<EmployeeLanguage>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>


  ) { }


  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee()

    const shop = await this.shopRepository.findOneBy({id: createEmployeeDto.shopId})

    if(!shop){
      throw new NotFoundException(`Shop ${createEmployeeDto.shopId} not found`);

    }

    employee.firstName = createEmployeeDto.firstName
    employee.lastName = createEmployeeDto.lastName
    employee.dateOfBirth = createEmployeeDto.dateOfBirth
    employee.gender = createEmployeeDto.gender
    employee.country = createEmployeeDto.country
    employee.shop = shop

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

  async findByShop(id: number) {
    const employess = await this.employeeRepository.find({
      relations:{
        shop:true
      },
      where:{
        shop:{
          id:id
        }
      }
    });

    return employess.map((employee) => {
      return {
          name: employee.firstName + " " +employee.lastName,
          id: employee.id
      }
  })
  }

  findByOrganization(id: number) {
    return this.employeeRepository.find({
      relations:{
        shop:true
      },
      where:{
        shop:{
          id:id
        }
      }
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
