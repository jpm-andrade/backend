// src/stats/dto/today-stats.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TodayStatsDto {
  @ApiProperty({
    description: 'Number of bookings scheduled for today but with no activities (waiting for check-in)',
    example: 5,
  })
  waitingCheckIn: number;

  @ApiProperty({
    description: 'Total number of bookings scheduled for today',
    example: 12,
  })
  bookingsToday: number;

  @ApiProperty({
    description: 'Total number of bookings created/registered today',
    example: 8,
  })
  registeredToday: number;

  @ApiProperty({
    description: 'Total gross income from bookings created today',
    example: 1234.56,
  })
  totalGrossIncomeToday: number;
}
