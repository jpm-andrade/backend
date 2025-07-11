import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto):Promise<Organization> {
    const organization = new Organization()

    organization.name = createOrganizationDto.name;
    organization.location= createOrganizationDto.location
    organization.isActive = true

    return this.organizationRepository.save(organization);
  }

  findAll() {
    return this.organizationRepository.find();
  }

  findOne(id: number):Promise<Organization | null> {
    return this.organizationRepository.findOneBy({id: id});
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    let organization = await  this.organizationRepository.findOneBy({id:id})

    if(!organization){

    }else {
      organization.isActive = updateOrganizationDto.isActive
      organization.name = updateOrganizationDto.name
      organization.location = updateOrganizationDto.location

      return this.organizationRepository.save(organization)
    }
    
    
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
