import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthorizedShop } from 'src/authorized-shops/entities/authorized-shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthorizedShop])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
