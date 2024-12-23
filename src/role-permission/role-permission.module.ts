import { Module } from '@nestjs/common';
import { RolePermissionService } from './service/role-permission.service';
import { RolePermissionController } from './controllers/role-permission.controller';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
