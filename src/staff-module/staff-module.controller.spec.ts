import { Test, TestingModule } from '@nestjs/testing';
import { StaffModuleController } from './staff-module.controller';

describe('StaffModuleController', () => {
  let controller: StaffModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffModuleController],
    }).compile();

    controller = module.get<StaffModuleController>(StaffModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
