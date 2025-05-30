// employee-language.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeLanguage } from './entities/employee-language.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Language } from '../languages/entities/language.entity';
import { UpdateEmployeeLanguageDto } from './dto/update-employee-language.dto';
import { CreateEmployeeLanguageDto } from './dto/create-employee-language.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class EmployeeLanguagesService {
  constructor(
    @InjectRepository(EmployeeLanguage)
    private readonly employeeLanguagesRepository: Repository<EmployeeLanguage>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) { }


  
  /** Create the link and return a read-model enriched with languageCode */
  async create(createEmployeeLanguageDto: CreateEmployeeLanguageDto) {
    /* ───── Make sure the FK targets exist ───── */
    const employeeLanguage = new EmployeeLanguage()

    const employee = await this.employeeRepository.findOne({
      where: { id: createEmployeeLanguageDto.employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee ${createEmployeeLanguageDto.employeeId} not found`);
    }

    const language = await this.languageRepository.findOne({
      where: { id: createEmployeeLanguageDto.languageId },
    });
    if (!language) {
      throw new NotFoundException(`Language ${createEmployeeLanguageDto.languageId} not found`);
    }

    employeeLanguage.employee = employee
    employeeLanguage.language = language

    const saved = await this.employeeLanguagesRepository.save(employeeLanguage);

    /* ───── Map to read-DTO ───── */
    return {
      id: saved.id,
      employeeId: saved.employee.id,
      languageCode: language.languageCode,
    };
  }

  async createBulk(createEmployeeLanguageDto: CreateEmployeeLanguageDto[]) {
    try {
      await Promise.all(createEmployeeLanguageDto.map(async (employeeLanguage) => {
        await this.create(employeeLanguage)
      })
      )
    } catch (error) {
      throw new ExceptionsHandler(error)
    }
  }

  findAll() {
    return this.employeeLanguagesRepository.find();
  }

  findByEmployee(id: number) {
    return this.employeeLanguagesRepository.find({

      relations: {
        employee: true
      },
      where: {
        employee: {
          id: id
        }
      }

    })
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeLanguage`;
  }

  update(id: number, updateEmployeeLanguageDto: UpdateEmployeeLanguageDto) {
    return `This action updates a #${id} employeeLanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeLanguage`;
  }
}
