import { Module } from '@nestjs/common';
import { ReferalAgentService } from './referal-agent.service';
import { ReferalAgentController } from './referal-agent.controller';

@Module({
  controllers: [ReferalAgentController],
  providers: [ReferalAgentService],
})
export class ReferalAgentModule {}
