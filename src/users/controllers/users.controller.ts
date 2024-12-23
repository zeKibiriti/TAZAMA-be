import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaginationDto, UsersDto } from '../dto/user.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * @param usersDto - DTO containing user data
   */
  @Post()
  create(@Body() usersDto: UsersDto) {
    return this.usersService.create(usersDto); // Pass the instance of usersDto
  }

  // @Post()
  // create(@Body() usersDto: UsersDto) {
  //   return this.usersService.create(UsersDto);
  // }

  /**
   * Retrieve paginated list of users
   * @param paginationDto - DTO containing pagination parameters
   */
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  /**
   * Retrieve a specific user by ID
   * @param id - User ID
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update a user's details
   * @param id - User ID
   * @param usersDto
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() usersDto: UsersDto) {
    return this.usersService.update(+id, usersDto);
  }

  /**
   * Delete a user by ID
   * @param id - User ID
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
