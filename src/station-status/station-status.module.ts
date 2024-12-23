import { Module } from '@nestjs/common';
import { StationStatusController } from './controllers/station-status.controller';
import { StationStatusService } from './service/station-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationStatus } from './entities/station-status.entity';

@Module({
  imports: [
    // Make sure the StationLog entity is registered here
    TypeOrmModule.forFeature([StationStatus]),
  ],
  controllers: [StationStatusController],
  providers: [StationStatusService],
})
export class StationStatusModule {}
