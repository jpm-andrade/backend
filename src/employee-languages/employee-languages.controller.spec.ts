import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLanguagesController } from './employee-languages.controller';
import { EmployeeLanguagesService } from './employee-languages.service';

describe('EmployeeLanguagesController', () => {
  let controller: EmployeeLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeLanguagesController],
      providers: [EmployeeLanguagesService],
    }).compile();

    controller = module.get<EmployeeLanguagesController>(EmployeeLanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
