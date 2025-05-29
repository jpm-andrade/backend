import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class ShopsService {

  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private readonly organizationService: OrganizationsService
  ) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const organization = await this.organizationService.findOne(createShopDto.organizationId)

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

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
