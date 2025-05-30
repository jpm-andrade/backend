import { Module } from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeController } from './activity-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityType, Shop]),
  ShopsModule
],
  controllers: [ActivityTypeController],
  providers: [ActivityTypeService],
  exports:[ActivityTypeService]
})
export class ActivityTypeModule { }
