import { Module } from '@nestjs/common';
import { RolesService } from './service/roles.service';
import { RolesController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    // Make sure the StationLog entity is registered here
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
