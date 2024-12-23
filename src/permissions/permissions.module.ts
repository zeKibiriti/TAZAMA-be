import { Module } from '@nestjs/common';
import { PermissionsService } from './service/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
