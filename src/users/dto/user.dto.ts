import { IsEmail, IsOptional, IsPositive, IsString, Length } from 'class-validator';

/**
 * DTO for pagination parameters
 */
export class PaginationDto {
    @IsOptional()
    @IsPositive()
    page?: number;

    @IsOptional()
    @IsPositive()
    limit?: number;
}

/**
 * DTO for creating a new user
 */
export class UsersDto {
    @IsString()
    @Length(1, 50, { message: 'First name must be between 1 and 50 characters.' })
    first_name!: string;

    @IsOptional()
    @IsString()
    @Length(0, 50, { message: 'Middle name must be less than 50 characters.' })
    middle_name?: string;

    @IsString()
    @Length(1, 50, { message: 'Last name must be between 1 and 50 characters.' })
    last_name!: string;

    @IsEmail({}, { message: 'Invalid email address.' })
    email!: string;

    @IsPositive()
    station_id!: number;

    @IsOptional()
    @IsString()
    @Length(6, 100, { message: 'Password must be between 6 and 100 characters.' })
    password?: string;
}

/**
 * DTO for updating an existing user
 */
