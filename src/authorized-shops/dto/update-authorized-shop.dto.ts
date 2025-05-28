import { PartialType } from '@nestjs/swagger';
import { CreateAuthorizedShopDto } from './create-authorized-shop.dto';

export class UpdateAuthorizedShopDto extends PartialType(CreateAuthorizedShopDto) {}
