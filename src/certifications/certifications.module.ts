import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Certification, Shop])],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
