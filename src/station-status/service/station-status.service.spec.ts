import { Test, TestingModule } from '@nestjs/testing';
import { StationStatusService } from './station-status.service';

describe('StationStatusService', () => {
  let service: StationStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationStatusService],
    }).compile();

    service = module.get<StationStatusService>(StationStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
