import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Region } from '../../regions/entities/region.entity';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  limit?: number;
}

export class StationsDto {
  @IsNotEmpty()
  @IsString()
  code!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  region!: Region;

  @IsOptional()
  @IsString()
  description!: string;
}
