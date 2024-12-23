import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StationsService } from '../service/stations.service';
import { StationsDto } from '../dto/stations.dto';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  async create(@Body() stationsDto: StationsDto) {
    // Save the station with the region and return the saved entity including the region
    return this.stationsService.create(stationsDto);
  }

  @Get()
  async findAll() {
    // Retrieve all stations with their associated regions
    return this.stationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Retrieve a specific station with its associated region
    return this.stationsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() stationsDto: StationsDto) {
    // Update the station with the region and return the updated entity
    return this.stationsService.update(+id, stationsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Delegate deletion to the service layer
    return this.stationsService.remove(+id);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   // Remove the station and return a confirmation
  //   return this.stationsService.remove(+id);
  // }
}
