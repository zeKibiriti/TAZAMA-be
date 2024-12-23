import { Test, TestingModule } from '@nestjs/testing';
import { StationLogController } from './station-log.controller';
import { StationLogService } from '../service/station-log.service';

describe('StationLogController', () => {
  let controller: StationLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationLogController],
      providers: [StationLogService],
    }).compile();

    controller = module.get<StationLogController>(StationLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
