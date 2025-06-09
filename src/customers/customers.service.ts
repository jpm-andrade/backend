import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { DisplayCustomer } from './dto/display-customer.dto';

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
    customer.referedFrom = createCustomerDto.referedFrom
    customer.phoneNumber = createCustomerDto.phoneNumber
    
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<DisplayCustomer[]> {
    const customers = this.customerRepository.find();

    return (await customers).map<DisplayCustomer>((customer)=>{
      return {
        birthDate: customer.dateOfBirth.toDateString(),
        country: customer.country,
        id: customer.id,
        name: customer.firstName + " " + customer.lastName,
        status: "booked",
        checkInDate: customer.createdAt.toDateString()
      }
    })
    
     
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
