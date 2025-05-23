import { Module } from '@nestjs/common';
import { ReferalAgentService } from './referal-agent.service';
import { ReferalAgentController } from './referal-agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalAgent } from './entities/referal-agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferalAgent])],
  controllers: [ReferalAgentController],
  providers: [ReferalAgentService],
})
export class ReferalAgentModule {}
