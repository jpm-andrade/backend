import { Module } from '@nestjs/common';
import { AuthorizedShopsService } from './authorized-shops.service';
import { AuthorizedShopsController } from './authorized-shops.controller';

@Module({
  controllers: [AuthorizedShopsController],
  providers: [AuthorizedShopsService],
})
export class AuthorizedShopsModule {}
