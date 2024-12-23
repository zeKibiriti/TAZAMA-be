import { Injectable, NotFoundException } from '@nestjs/common';
import { StationStatusDto } from '../dto/station-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../users/dto/user.dto';
import { StationStatus } from '../entities/station-status.entity';

@Injectable()
export class StationStatusService {
  constructor(
    @InjectRepository(StationStatus)
    private readonly stationStatusRepository: Repository<StationStatus>,
  ) {}

  /**
   * Create a new user
   * @returns Created user
   * @param stationStatusDto
   */
  async create(stationStatusDto: StationStatusDto): Promise<StationStatusDto> {
    const newStatus = this.stationStatusRepository.create(stationStatusDto);
    return this.stationStatusRepository.save(newStatus);
  }

  /**
   * Find all users with pagination
   * @param pagination Pagination parameters (page and limit)
   * @returns Paginated list of users
   */

  async findAll(): Promise<{ data: StationStatus[]; total: number }> {
    // Retrieve all data and the total count
    const [data, total] = await this.stationStatusRepository.findAndCount();

    return {
      data,
      total,
    };
  }

  // async findOne(id: number): Promise<StationStatus> {
  //   try {
  //     return await this.stationStatusRepository.findOneOrFail({ where: { id } });
  //   } catch (error) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  // }

  /**
   * Update a user by ID
   * @param id User ID
   * @param updateStationStatusDto
   * @returns Updated user
   */
  async update(id: number, updateStationStatusDto: StationStatusDto): Promise<StationStatus> {
    const station = await this.stationStatusRepository.findOne({ where: { id } });
    if (!station) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }
    Object.assign(station, updateStationStatusDto);
    return this.stationStatusRepository.save(station);
  }

  /**
   * Remove a user by ID
   * @param userId User ID
   * @returns Success message
   */
  async remove(userId: number): Promise<{ message: string }> {
    const result = await this.stationStatusRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Status with ID ${userId} not found`);
    }
    return { message: 'Status deleted successfully' };
  }
}


// @Injectable()
// export class StationStatusService {
//   create(stationStatusDto: StationStatusDto) {
//     return 'This action adds a new stationStatus';
//   }
//
//   findAll() {
//     return `This action returns all stationStatus`;
//   }
//
//   findOne(id: number) {
//     return `This action returns a #${id} stationStatus`;
//   }
//
//   update(id: number, stationStatusDto: StationStatusDto) {
//     return `This action updates a #${id} stationStatus`;
//   }
//
//   remove(id: number) {
//     return `This action removes a #${id} stationStatus`;
//   }
// }
