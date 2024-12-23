import { Module } from '@nestjs/common';
import { StationLogService } from './service/station-log.service';
import { StationLogController } from './controllers/station-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationLog } from './entities/station-log.entity';

@Module({
  imports: [
    // Make sure the StationLog entity is registered here
    TypeOrmModule.forFeature([StationLog]),
  ],
  controllers: [StationLogController],
  providers: [StationLogService],
})
export class StationLogModule {}
