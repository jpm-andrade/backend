import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeRole } from './entities/employee-role.entity';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';
import { Shop } from 'src/shops/entities/shop.entity';

@Injectable()
export class EmployeeRolesService {
  constructor(
    @InjectRepository(EmployeeRole)
    private readonly roleRepo: Repository<EmployeeRole>,
    @InjectRepository(Shop)
    private readonly shopRepo: Repository<Shop>
  ) { }

  async create(dto: CreateEmployeeRoleDto) {
    const shop = await this.shopRepo.findOneBy({id:dto.shopId})
    if(!shop){
      throw new NotFoundException(`Shop with ID ${dto.shopId} not found`);
    }
    const role = new EmployeeRole()
    role.name = dto.name
    role.shop = shop
    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find({
      relations: {
        shop: true
      }
    });
  }

  findOne(id: number) {
    return this.roleRepo.findOneBy({ id });
  }

  findByShop(id: number) {
    return this.roleRepo.find({
      where: { shop: { id: id } },
    });
  }

  update(id: number, dto: UpdateEmployeeRoleDto) {
    return this.roleRepo.update(id, dto);
  }

  remove(id: number) {
    return this.roleRepo.delete(id);
  }
}
