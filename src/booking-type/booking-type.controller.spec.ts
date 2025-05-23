import { Test, TestingModule } from '@nestjs/testing';
import { BookingTypeController } from './booking-type.controller';
import { BookingTypeService } from './booking-type.service';

describe('BookingTypeController', () => {
  let controller: BookingTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingTypeController],
      providers: [BookingTypeService],
    }).compile();

    controller = module.get<BookingTypeController>(BookingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
