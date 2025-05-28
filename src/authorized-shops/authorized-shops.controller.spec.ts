import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedShopsController } from './authorized-shops.controller';
import { AuthorizedShopsService } from './authorized-shops.service';

describe('AuthorizedShopsController', () => {
  let controller: AuthorizedShopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizedShopsController],
      providers: [AuthorizedShopsService],
    }).compile();

    controller = module.get<AuthorizedShopsController>(AuthorizedShopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
