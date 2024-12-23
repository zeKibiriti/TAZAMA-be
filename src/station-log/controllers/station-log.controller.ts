import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationLogService } from '../service/station-log.service';
import { CreateStationLogDto, PaginationDto, UpdateStationLogDto } from '../dto/station-log.dto';
import { StationLog } from '../entities/station-log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('station-log')
export class StationLogController {
  constructor(
    private readonly stationLogService: StationLogService,
    @InjectRepository(StationLog)
    private readonly stationLogRepository: Repository<StationLog>) {}

  @Post()
  create(@Body() createStationLogDto: CreateStationLogDto) {
    return this.stationLogService.create(createStationLogDto);
  }

  @Get()
  async findAll() {
    return await this.stationLogRepository.find({
      relations: ['user'], // Assuming 'user' is the relation name in StationLog entity
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.stationLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationLogDto: UpdateStationLogDto) {
    return this.stationLogService.update(+id, updateStationLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationLogService.remove(+id);
  }
}
