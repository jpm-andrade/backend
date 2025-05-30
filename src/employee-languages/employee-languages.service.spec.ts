import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLanguagesService } from './employee-languages.service';

describe('EmployeeLanguagesService', () => {
  let service: EmployeeLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeLanguagesService],
    }).compile();

    service = module.get<EmployeeLanguagesService>(EmployeeLanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
