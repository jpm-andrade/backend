import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorizedShopsService } from './authorized-shops.service';
import { CreateAuthorizedShopDto } from './dto/create-authorized-shop.dto';
import { UpdateAuthorizedShopDto } from './dto/update-authorized-shop.dto';

@Controller('authorized-shops')
export class AuthorizedShopsController {
  constructor(private readonly authorizedShopsService: AuthorizedShopsService) {}

  @Post()
  create(@Body() createAuthorizedShopDto: CreateAuthorizedShopDto) {
    return this.authorizedShopsService.create(createAuthorizedShopDto);
  }

  @Get()
  findAll() {
    return this.authorizedShopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorizedShopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorizedShopDto: UpdateAuthorizedShopDto) {
    return this.authorizedShopsService.update(+id, updateAuthorizedShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorizedShopsService.remove(+id);
  }
}
