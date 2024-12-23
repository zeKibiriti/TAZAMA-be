import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolePermissionService } from '../service/role-permission.service';
import { RolePermissionDto } from '../dto/role-permission.dto';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post()
  create(@Body() rolePermissionDto: RolePermissionDto) {
    return this.rolePermissionService.create(rolePermissionDto);
  }

  @Get()
  findAll() {
    return this.rolePermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() rolePermissionDto: RolePermissionDto) {
    return this.rolePermissionService.update(+id, rolePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePermissionService.remove(+id);
  }
}
