import { Injectable } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) { }


  async create(createCertificationDto: CreateCertificationDto) {
    const shop = await this.shopRepository.findOneBy({id:createCertificationDto.shopId})

    if (!shop) {
      throw Error()
    }

    const certification = new Certification();

    certification.label = createCertificationDto.label
    certification.shop = shop

    return this.certificationRepository.save(certification);
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} certification`;
  }
  async findBasedOnShop(id: number) {
    return await this.certificationRepository.find(
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
  async update(id: number, updateCertificationDto: UpdateCertificationDto) {
    let certification = await this.certificationRepository.findOneBy({ id: id })

    if (!certification || !updateCertificationDto.label) {

    } else {
      certification.label = updateCertificationDto.label!
      return this.certificationRepository.save(certification);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} certification`;
  }
}
