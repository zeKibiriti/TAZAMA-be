import { Injectable } from '@nestjs/common';
import { RegionsDto } from '../dto/regions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../entities/region.entity';
import { StationStatus } from '../../station-status/entities/station-status.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionsRepository: Repository<Region>,
  ) {}

  async create(regionsDto: RegionsDto): Promise<RegionsDto> {
    const newRegion = this.regionsRepository.create(regionsDto);
    return this.regionsRepository.save(newRegion);
  }

  async findAll(): Promise<{ data: RegionsDto[]; total: number }> {
    // Retrieve all data and the total count
    const [data, total] = await this.regionsRepository.findAndCount();
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number, regionsDto: RegionsDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
