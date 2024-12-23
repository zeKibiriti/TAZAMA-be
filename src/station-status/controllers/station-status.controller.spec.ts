import { Test, TestingModule } from '@nestjs/testing';
import { StationStatusController } from './station-status.controller';
import { StationStatusService } from '../service/station-status.service';

describe('StationStatusController', () => {
  let controller: StationStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationStatusController],
      providers: [StationStatusService],
    }).compile();

    controller = module.get<StationStatusController>(StationStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
