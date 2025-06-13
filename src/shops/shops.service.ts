import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Organization } from 'src/organizations/entities/organization.entity';

@Injectable()
export class ShopsService {

  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const organization = await this.organizationRepository.findOneBy({id:createShopDto.organizationId})

    if(!organization){
      throw Error() 
    }

    const shop = new Shop()

    shop.country = createShopDto.country
    shop.createdAt = new Date()
    shop.location = createShopDto.location
    shop.organization = organization
    shop.name = createShopDto.name

    return this.shopRepository.save(shop)
  }

  findAll() {
    return this.shopRepository.find();
  }

  async findOrganization(id:number) {
    return this.shopRepository.find(
      {
        relations:{
          organization:true
        },
        where:{
          organization:{
            id: id
          }
        }
      }
    );
  }

  async findOne(id:number) {
    return this.shopRepository.findOneBy({id:id})
  }  

  async findShopForDisplay(id: number) {
    const shop = await this.shopRepository.findOneBy({ id: id })
    
    if(!shop)
      return {}
    
    return {
      id: shop.id,
      name: shop.name,
      location: shop.location,
      organizationName: shop.organization.name,
      organizationId: shop.organization.id,
      country: shop.country
    }
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    let shop = await this.shopRepository.findOneBy({id:id})

    if(shop){
      shop.country = updateShopDto.country
      shop.location = updateShopDto.location
      shop.name = updateShopDto.name
    }else{

    }
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
