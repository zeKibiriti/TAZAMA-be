import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationLogDto, UpdateStationLogDto } from '../dto/station-log.dto';
import { PaginationDto } from '../../users/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationLog } from '../entities/station-log.entity';
import { StationStatus } from '../../station-status/entities/station-status.entity';

@Injectable()
export class StationLogService {
  constructor(
    @InjectRepository(StationLog)
    private readonly stationLogRepository: Repository<StationLog>,
  ) {}

  /**
   * Create a new station log
   */
  async create(createStationLogDto: CreateStationLogDto): Promise<StationLog> {
    const { stationStatus, operatorId, shiftLeaderId, ...rest } = createStationLogDto;
    const stationLog = this.stationLogRepository.create(rest);
    // Resolve stationStatus if provided
    if (stationStatus) {
      const stationStatusEntity = await this.stationLogRepository.manager
        .getRepository(StationStatus)
        .findOne({ where: { id: Number(stationStatus) } });
      if (!stationStatusEntity) {
        throw new Error(`StationStatus with ID ${stationStatus} not found`);
      }
      stationLog.stationStatus = stationStatusEntity;
    }
    // Add operator or shiftLeader resolution if needed here (similar to stationStatus)
    return this.stationLogRepository.save(stationLog);
  }

  // async create(createStationLogDto: CreateStationLogDto): Promise<StationLog> {
  //   const newStationLog = this.stationLogRepository.create(createStationLogDto);
  //   return await this.stationLogRepository.save(newStationLog);
  // }

  /**
   * Get all station logs with pagination
   */
  async findAll(): Promise<{ data: StationLog[]; total: number }> {
    // Retrieve all data with related tables and the total count
    const [data, total] = await this.stationLogRepository.findAndCount({
      relations: ['user', 'stationLog'], // Include related tables
    });
    return {
      data,
      total,
    };
  }

  // async findAll(): Promise<{ data: StationLog[]; total: number }> {
  //   // Retrieve all data and the total count
  //   const [data, total] = await this.stationLogRepository.findAndCount();
  //
  //   return {
  //     data,
  //     total,
  //   };
  // }

  /**
   * Get a single station log by ID
   */
  async findOne(id: number): Promise<StationLog> {
    const stationLog = await this.stationLogRepository.findOne({
      where: { id },
      relations: ['user', 'stationLog'],
    });
    if (!stationLog) {
      throw new NotFoundException(`StationLog with ID ${id} not found`);
    }
    return stationLog;
  }

  /**
   * Update an existing station log
   */
  async update(id: number, updateStationLogDto: UpdateStationLogDto): Promise<StationLog> {
    // Find the existing StationLog
    const existingStationLog = await this.findOne(id); // Reuse `findOne` for consistency

    // Extract relational fields from the DTO
    const { stationStatus, operatorId, shiftLeaderId, ...rest } = updateStationLogDto;
    // Resolve operator if provided
    if (operatorId) {
      const operatorEntity = await this.stationLogRepository.manager
        .getRepository(StationLog)
        .findOne({ where: { id: operatorId } });
      if (!operatorEntity) {
        throw new NotFoundException(`Operator with ID ${operatorId} not found`);
      }
      // existingStationLog.operator = operatorEntity;
    }

    // Resolve shiftLeader if provided
    if (shiftLeaderId) {
      const shiftLeaderEntity = await this.stationLogRepository.manager
        .getRepository(StationLog)
        .findOne({ where: { id: shiftLeaderId } });
      if (!shiftLeaderEntity) {
        throw new NotFoundException(`ShiftLeader with ID ${shiftLeaderId} not found`);
      }
      // existingStationLog.shiftLeader = shiftLeaderEntity;
    }

    // Update non-relational fields
    Object.assign(existingStationLog, rest);

    // Save the updated StationLog to the database
    return await this.stationLogRepository.save(existingStationLog);
  }

  /**
   * Remove a station log by ID
   */
  async remove(id: number): Promise<void> {
    const stationLog = await this.findOne(id); // Ensure the record exists
    await this.stationLogRepository.remove(stationLog);
  }
}
