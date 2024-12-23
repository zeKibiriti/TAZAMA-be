import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add User entity here
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
