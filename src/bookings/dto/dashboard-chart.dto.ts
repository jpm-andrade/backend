// src/stats/dto/get-bookings-by-day.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class GetBookingsByDayDto {
  @ApiPropertyOptional({
    description: 'Start date (YYYY-MM-DD)',
    example: '2025-06-01',
  })
  @IsOptional()
  @Type(() => Date)
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date (YYYY-MM-DD)',
    example: '2025-06-30',
  })
  @IsOptional()
  @Type(() => Date)
  @IsISO8601()
  endDate?: string;
}