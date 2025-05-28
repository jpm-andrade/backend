import { Injectable } from '@nestjs/common';
import { CreateAuthorizedShopDto } from './dto/create-authorized-shop.dto';
import { UpdateAuthorizedShopDto } from './dto/update-authorized-shop.dto';

@Injectable()
export class AuthorizedShopsService {
  create(createAuthorizedShopDto: CreateAuthorizedShopDto) {
    return 'This action adds a new authorizedShop';
  }

  findAll() {
    return `This action returns all authorizedShops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorizedShop`;
  }

  update(id: number, updateAuthorizedShopDto: UpdateAuthorizedShopDto) {
    return `This action updates a #${id} authorizedShop`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorizedShop`;
  }
}
