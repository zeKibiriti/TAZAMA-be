import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async create(permissionDto: PermissionDto): Promise<PermissionDto> {
    const newPermission = this.permissionsRepository.create(permissionDto);
    return this.permissionsRepository.save(newPermission);
  }

  /**
   * Find all users with pagination
   * @returns Paginated list of permissions
   */

  async findAll(): Promise<{ data: Permission[]; total: number }> {
    // Retrieve all data and the total count
    const [data, total] = await this.permissionsRepository.findAndCount();

    return {
      data,
      total,
    };
  }

  /**
   * Update a user by ID
   * @param id User ID
   * @param permissionDto
   * @returns Updated user
   */
  async update(id: number, permissionDto: PermissionDto): Promise<PermissionDto> {
    const station = await this.permissionsRepository.findOne({ where: { id } });
    if (!station) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    Object.assign(station, permissionDto);
    return this.permissionsRepository.save(station);
  }

  /**
   * Remove a user by ID
   * @param userId User ID
   * @returns Success message
   */
  async remove(userId: number): Promise<{ message: string }> {
    const result = await this.permissionsRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with ID ${userId} not found`);
    }
    return { message: 'Permission deleted successfully' };
  }
}
