import { Module } from '@nestjs/common';
import { StationsService } from './service/stations.service';
import { StationsController } from './controllers/stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station]),
  ],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
