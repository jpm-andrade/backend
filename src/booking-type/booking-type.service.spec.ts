import { Test, TestingModule } from '@nestjs/testing';
import { BookingTypeService } from './booking-type.service';

describe('BookingTypeService', () => {
  let service: BookingTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTypeService],
    }).compile();

    service = module.get<BookingTypeService>(BookingTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
