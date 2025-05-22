import { Test, TestingModule } from '@nestjs/testing';
import { ReferalAgentController } from './referal-agent.controller';
import { ReferalAgentService } from './referal-agent.service';

describe('ReferalAgentController', () => {
  let controller: ReferalAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferalAgentController],
      providers: [ReferalAgentService],
    }).compile();

    controller = module.get<ReferalAgentController>(ReferalAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
