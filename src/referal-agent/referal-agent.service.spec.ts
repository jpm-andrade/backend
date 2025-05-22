import { Test, TestingModule } from '@nestjs/testing';
import { ReferalAgentService } from './referal-agent.service';

describe('ReferalAgentService', () => {
  let service: ReferalAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferalAgentService],
    }).compile();

    service = module.get<ReferalAgentService>(ReferalAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
