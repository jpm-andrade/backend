import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedShopsService } from './authorized-shops.service';

describe('AuthorizedShopsService', () => {
  let service: AuthorizedShopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizedShopsService],
    }).compile();

    service = module.get<AuthorizedShopsService>(AuthorizedShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
