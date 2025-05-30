import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

/* ─────────────────────────── RESPONSE / READ ─────────────────────────── */

export class BaseEmployeeLanguage {
  @ApiPropertyOptional({ example: 12, readOnly: true })
  id?: number;

  @ApiProperty({ example: 104, description: 'FK → employees.id' })
  employeeId: number;

  @ApiProperty({ example: 3, description: 'FK → languages.id' })
  languageId: number;
}