import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from '../service/regions.service';
import { RegionsDto } from '../dto/regions.dto';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  create(@Body() regionsDto: RegionsDto) {
    return this.regionsService.create(regionsDto);
  }

  @Get()
  async findAll() {
    const result = await this.regionsService.findAll();
    return result.data; // Return only the array of regions
  }

  // @Get()
  // findAll() {
  //   return this.regionsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() regionsDto: RegionsDto) {
    return this.regionsService.update(+id, regionsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
