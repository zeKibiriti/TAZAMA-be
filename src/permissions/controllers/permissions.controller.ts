import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsService } from '../service/permissions.service';
import { PermissionDto } from '../dto/permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() permissionDto: PermissionDto) {
    return this.permissionsService.create(permissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.permissionsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() permissionDto: PermissionDto) {
    return this.permissionsService.update(+id, permissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
