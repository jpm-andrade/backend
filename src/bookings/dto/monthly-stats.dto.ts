// src/stats/dto/monthly-stats.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class MonthlyStatsDto {
  @ApiProperty({
    description: 'Total number of bookings in the specified month',
    example: 42,
  })
  totalBookings: number;

  @ApiProperty({
    description: 'Number of new customers added in the specified month',
    example: 10,
  })
  newCustomers: number;

  @ApiProperty({
    description: 'Total gross income for the specified month',
    example: 12345.67,
  })
  totalGrossIncome: number;

  @ApiProperty({
    description: 'Total value of commissions for the specified month',
    example: 234.56,
  })
  totalCommissions: number;
}
