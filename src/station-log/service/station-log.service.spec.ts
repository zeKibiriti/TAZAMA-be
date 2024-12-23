import { Test, TestingModule } from '@nestjs/testing';
import { StationLogService } from './station-log.service';

describe('StationLogService', () => {
  let service: StationLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationLogService],
    }).compile();

    service = module.get<StationLogService>(StationLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
