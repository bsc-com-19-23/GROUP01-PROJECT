import { Test, TestingModule } from '@nestjs/testing';
import { StaffModuleService } from './staff-module.service';

describe('StaffModuleService', () => {
  let service: StaffModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffModuleService],
    }).compile();

    service = module.get<StaffModuleService>(StaffModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
