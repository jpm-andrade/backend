import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseLanguage {
  /* ─────────────── Primary key ─────────────── */

  @ApiPropertyOptional({
    example: 3,
    readOnly: true,
    description: 'Auto-generated ID (read-only in requests)',
  })
  id?: number;

  /* ─────────────── Columns ─────────────── */

  @ApiProperty({
    example: 'Dutch',
    description: 'Human-readable name of the language',
  })
  label: string;

  @ApiProperty({
    example: 'nl',
    description: 'ISO-639-1 language code',
  })
  language_code: string;
}