import { Module } from '@nestjs/common';
import { AuthorizedShopsService } from './authorized-shops.service';
import { AuthorizedShopsController } from './authorized-shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizedShop } from './entities/authorized-shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizedShop])],
  providers: [AuthorizedShopsService],
  controllers: [AuthorizedShopsController],
  exports: [AuthorizedShopsService],
})
export class AuthorizedShopsModule { }
