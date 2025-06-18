import { Injectable } from '@nestjs/common';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { ShopsService } from 'src/shops/shops.service';
import { Shop } from 'src/shops/entities/shop.entity';

@Injectable()
export class ActivityTypeService {

  constructor(
    @InjectRepository(ActivityType)
    private readonly activityTypeRepository: Repository<ActivityType>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,

  ) { }


  async create(createActivityTypeDto: CreateActivityTypeDto) {
    const shop = await this.shopRepository.findOneBy({ id: createActivityTypeDto.shopId })

    if (!shop) {
      throw Error()
    }

    const activityType = new ActivityType()


    activityType.category = createActivityTypeDto.category
    activityType.label = createActivityTypeDto.label
    activityType.bookingType = createActivityTypeDto.bookingType
    activityType.shop = shop
    if (createActivityTypeDto.price)
      activityType.price = createActivityTypeDto.price



    return this.activityTypeRepository.save(activityType)
  }

  findAll() {
    return this.activityTypeRepository.find();;
  }

  findOne(id: number) {
    return this.activityTypeRepository.findOneBy({ id: id });
  }

  findBasedOnShop(id: number) {
    console.log(id)
    return this.activityTypeRepository.find(
      {
        relations: {
          shop: true
        },
        where: {
          shop: {
            id: id
          }
        }
      }
    );;
  }

  async update(id: number, updateActivityTypeDto: UpdateActivityTypeDto) {
    let activityType = await this.activityTypeRepository.findOneBy({ id: id })

    if (!activityType) {

    } else {
      activityType.category = updateActivityTypeDto.category
      activityType.label = updateActivityTypeDto.label
      activityType.bookingType = updateActivityTypeDto.bookingType
      if (updateActivityTypeDto.price)
        activityType.price = updateActivityTypeDto.price

      return this.activityTypeRepository.save(activityType);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} activityType`;
  }
}
