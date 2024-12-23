import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto, UsersDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   * @returns Created user
   * @param usersDto
   */
  async create(usersDto: UsersDto): Promise<User> {
    const newUser = this.usersRepository.create(usersDto);
    return this.usersRepository.save(newUser);
  }

  /**
   * Find all users with pagination
   * @returns Paginated list of users
   * @param paginationDto
   */

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto; // Default values if not provided

    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['station'], // Include the station relation here
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // async findAll(pagination: PaginationDto): Promise<any[]> {
  //   const { page = 1, limit = 10 } = pagination; // Default pagination values
  //   // Retrieve data and total count from the repository
  //   const [data] = await this.userRepository.findAndCount({
  //     skip: (page - 1) * limit,
  //     take: limit,
  //   });
  //
  //   // Return the data array only
  //   return data;
  // }

  // async findAll(pagination: PaginationDto) {
  //   const { page = 1, limit = 10 } = pagination; // Default values if not provided
  //   const [data, total] = await this.userRepository.findAndCount({
  //     skip: (page - 1) * limit,
  //     take: limit,
  //   });
  //
  //   return {
  //     data,
  //     total,
  //     page,
  //     limit,
  //     totalPages: Math.ceil(total / limit),
  //   };
  // }

  /**
   * Find a user by ID
   * @param id User ID
   * @returns Found user
   */
  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  /**
   * Update a user by ID
   * @param id User ID
   * @param usersDto
   * @returns Updated user
   */
  async update(id: number, usersDto: UsersDto): Promise<User> {
    const user = await this.findOne(id); // Reuse the `findOne` method to reduce duplication
    Object.assign(user, usersDto);
    return this.usersRepository.save(user);
  }

  /**
   * Remove a user by ID
   * @param userId User ID
   * @returns Success message
   */
  async remove(userId: number): Promise<{ message: string }> {
    const result = await this.usersRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}
