import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { StationLogModule } from './station-log/station-log.module';
import { StationStatusModule } from './station-status/station-status.module';
import { StationsModule } from './stations/stations.module';
import { RegionsModule } from './regions/regions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { RolePermissionModule } from './role-permission/role-permission.module';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: +configService.get<number>('DB_PORT', 5432), // Use `+` to parse as number
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'peter.01'),
        database: configService.get<string>('DB_NAME', 'tazama_operation'),
        entities: [join(__dirname, '**', '*.entity.{js,ts}')], // Correct entity path
        synchronize: true, // Enable in development only
      }),
    }),
    UsersModule,
    StationLogModule,
    StationStatusModule,
    StationsModule,
    RegionsModule,
    PermissionsModule,
    RolesModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
