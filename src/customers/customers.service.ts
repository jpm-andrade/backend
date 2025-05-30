import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class CustomersService {

  
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = new Customer()

    customer.firstName = createCustomerDto.firstName
    customer.lastName = createCustomerDto.lastName
    customer.dateOfBirth = createCustomerDto.dateOfBirth
    customer.gender = createCustomerDto.gender
    customer.country = createCustomerDto.country
    
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOneBy({id:id});
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
