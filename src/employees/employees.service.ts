import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeLanguage } from 'src/employee-languages/entities/employee-language.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { EmployeeRole } from 'src/employee-roles/entities/employee-role.entity';

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
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(EmployeeRole)
    private readonly roleRepository: Repository<EmployeeRole>,

  ) { }


  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee()

    const shop = await this.shopRepository.findOneBy({ id: createEmployeeDto.shopId })

    if (!shop) {
      throw new NotFoundException(`Shop ${createEmployeeDto.shopId} not found`);

    }

    const role = await this.roleRepository.findOneBy({ id: createEmployeeDto.roleId });
    if (!role) throw new NotFoundException(`Role ID ${createEmployeeDto.roleId} not found`);

    employee.firstName = createEmployeeDto.firstName
    employee.lastName = createEmployeeDto.lastName
    employee.dateOfBirth = createEmployeeDto.dateOfBirth
    employee.gender = createEmployeeDto.gender
    employee.country = createEmployeeDto.country
    employee.shop = shop
    employee.role = role
    employee.freelancer = createEmployeeDto.freelancer

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


    return this.employeeRepository.findOneBy({ id: savedEmployee.id });
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOneBy({ id: id });
  }

  async findByShop(id: number) {
    const employess = await this.employeeRepository.find({
      relations: {
        shop: true,
        employeeLanguages: true,
        role:true
      },
      where: {
        shop: {
          id: id
        }
      }
    });

    return employess.map((employee) => {
      let lang
      if (employee.employeeLanguages)
        lang = employee.employeeLanguages.map((empLang) => { return empLang.language.languageCode })

      return {
        id: employee.id,
        name: employee.firstName + " " + employee.lastName,
        status: employee.status,
        role: employee.role.name,
        languages: lang?.join()
      }
    })
  }

  async findByShopForList(id: number) {
    const employees = await this.employeeRepository.find({
      relations: {
        shop: true
      },
      where: {
        shop: {
          id: id
        }
      }
    });

    return employees.map((employee) => {
      return {
        label: employee.firstName + " " + employee.lastName,
        id: employee.id
      }
    })
  }

  async findByRole(roleId: number) {
    const employees = await this.employeeRepository.find({
      relations: {
        role: true
      },
      where: {
        role: {
          id: roleId
        }
      }
    });

    return employees.map((employee) => {
      let lang
      if (employee.employeeLanguages)
        lang = employee.employeeLanguages.map((empLang) => { return empLang.language.languageCode })

      return {
        id: employee.id,
        name: employee.firstName + " " + employee.lastName,
        status: employee.status,
        role: employee.role,
        languages: lang?.join()
      }
    })
  }

  findByOrganization(id: number) {
    return this.employeeRepository.find({
      relations: {
        shop: true
      },
      where: {
        shop: {
          id: id
        }
      }
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['shop', 'role'],
    });

    if (!employee) throw new NotFoundException(`Employee ${id} not found`);

    // Update primitive fields
    employee.firstName = updateEmployeeDto.firstName ?? employee.firstName;
    employee.lastName = updateEmployeeDto.lastName ?? employee.lastName;
    employee.dateOfBirth = updateEmployeeDto.dateOfBirth ?? employee.dateOfBirth;
    employee.gender = updateEmployeeDto.gender ?? employee.gender;
    employee.country = updateEmployeeDto.country ?? employee.country;
    employee.freelancer = updateEmployeeDto.freelancer


    // Optional role update
    if (updateEmployeeDto.roleId) {
      const role = await this.roleRepository.findOneBy({ id: updateEmployeeDto.roleId });
      if (!role) throw new NotFoundException(`Role ID ${updateEmployeeDto.roleId} not found`);
      employee.role = role;
    }

    // Optional shop update
    if (updateEmployeeDto.shopId) {
      const shop = await this.shopRepository.findOneBy({ id: updateEmployeeDto.shopId });
      if (!shop) throw new NotFoundException(`Shop ${updateEmployeeDto.shopId} not found`);
      employee.shop = shop;
    }

    await this.employeeRepository.save(employee);

    return this.employeeRepository.findOne({ where: { id: employee.id } });
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
