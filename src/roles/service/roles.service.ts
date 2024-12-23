import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleDto } from '../dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { PermissionDto } from '../../permissions/dto/permission.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(roleDto: RoleDto): Promise<RoleDto> {
    const newRole = this.rolesRepository.create(roleDto);
    return this.rolesRepository.save(newRole);
  }
  // create(roleDto: RoleDto) {
  //   const newRole = this.rolesRepository.create(roleDto);
  //   return this.rolesRepository.save(newRole);
  // }

  async findAll(): Promise<{ data: Role[]; total: number }> {
    // Retrieve all data and the total count
    const [data, total] = await this.rolesRepository.findAndCount();

    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, roleDto: RoleDto): Promise<RoleDto> {
    // Find the existing role by ID
    const existingRole = await this.rolesRepository.findOne({ where: { id } });

    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // Update the existing role with the data from roleDto
    Object.assign(existingRole, roleDto);

    // Save the updated role to the database
    // Return the updated role data
    return await this.rolesRepository.save(existingRole);
  }

  // async update(id: number, roleDto: RoleDto): Promise<RoleDto> {
  //   const station = await this.rolesRepository.findOne({ where: { id } });
  //   if (!station) {
  //     throw new NotFoundException(`Role with ID ${id} not found`);
  //   }
  //   // Object.assign(permission, RoleDto);
  //   // return this.rolesRepository.save(permission);
  // }

  async remove(userId: number): Promise<{ message: string }> {
    const result = await this.rolesRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${userId} not found`);
    }
    return { message: 'Role deleted successfully' };
  }

}
