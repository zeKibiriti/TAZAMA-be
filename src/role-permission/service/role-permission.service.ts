import { Injectable } from '@nestjs/common';
import { RolePermissionDto } from '../dto/role-permission.dto';

@Injectable()
export class RolePermissionService {
  create(rolePermissionDto: RolePermissionDto) {
    return 'This action adds a new rolePermission';
  }

  findAll() {
    return `This action returns all rolePermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePermission`;
  }

  update(id: number, rolePermissionDto: RolePermissionDto) {
    return `This action updates a #${id} rolePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePermission`;
  }
}
