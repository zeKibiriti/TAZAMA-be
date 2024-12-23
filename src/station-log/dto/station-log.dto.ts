import { IsDate, IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty, IsPositive } from 'class-validator';

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

export class CreateStationLogDto {
  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @IsString()
  @IsNotEmpty()
  stationStatus!: number;

  @IsNumber()
  @IsNotEmpty()
  inletPressure!: number;

  @IsNumber()
  @IsNotEmpty()
  outletPressure!: number;

  @IsNumber()
  @IsNotEmpty()
  averageFlowRate!: number;

  @IsNumber()
  @IsNotEmpty()
  operatingUnits!: number;

  @IsNumber()
  @IsNotEmpty()
  unitsOnStandby!: number;

  @IsNumber()
  @IsNotEmpty()
  unitsOnMaintenance!: number;

  @IsString()
  @IsNotEmpty()
  powerSource!: string;

  @IsBoolean()
  @IsNotEmpty()
  tankOnDelivery!: boolean;

  @IsNumber()
  @IsNotEmpty()
  pumpOver24Hrs!: number;

  @IsNumber()
  @IsNotEmpty()
  pumpingDaysRemainingT4!: number;

  @IsString()
  @IsOptional()
  remarks!: string;

  @IsNumber()
  @IsNotEmpty()
  operatorId!: number;

  @IsNumber()
  @IsNotEmpty()
  shiftLeaderId!: number;
}

export class UpdateStationLogDto {
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  stationStatus?: string;

  @IsNumber()
  @IsOptional()
  inletPressure?: number;

  @IsNumber()
  @IsOptional()
  outletPressure?: number;

  @IsNumber()
  @IsOptional()
  averageFlowRate?: number;

  @IsNumber()
  @IsOptional()
  operatingUnits?: number;

  @IsNumber()
  @IsOptional()
  unitsOnStandby?: number;

  @IsNumber()
  @IsOptional()
  unitsOnMaintenance?: number;

  @IsString()
  @IsOptional()
  powerSource?: string;

  @IsBoolean()
  @IsOptional()
  tankOnDelivery?: boolean;

  @IsNumber()
  @IsOptional()
  pumpOver24Hrs?: number;

  @IsNumber()
  @IsOptional()
  pumpingDaysRemainingT4?: number;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsNumber()
  @IsOptional()
  operatorId?: number;

  @IsNumber()
  @IsOptional()
  shiftLeaderId?: number;
}