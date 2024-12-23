import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { StationStatusService } from '../service/station-status.service';
import { PaginationDto, StationStatusDto } from '../dto/station-status.dto';

@Controller('station-status')
export class StationStatusController {
  constructor(private readonly stationStatusService: StationStatusService) {}

  @Post()
  create(@Body() createStationStatusDto: StationStatusDto) {
    return this.stationStatusService.create(createStationStatusDto);
  }

  @Get()
  findAll() {
    return this.stationStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.stationStatusService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStationStatusDto: StationStatusDto
  ) {
    const updatedStation = await this.stationStatusService.update(id, updateStationStatusDto);

    if (!updatedStation) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }

    return {
      message: 'Station updated successfully',
      data: updatedStation,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStationStatusDto: StationStatusDto) {
  //   return this.stationStatusService.update(+id, updateStationStatusDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationStatusService.remove(+id);
  }
}
