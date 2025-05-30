import { ApiProperty } from '@nestjs/swagger';
import { BaseEmployee } from './base-employee.dto';

export class UpdateEmployeeDto extends BaseEmployee {
    /* ─────────────── Audit columns ─────────────── */

    @ApiProperty({ example: '2025-05-30T10:15:00Z', readOnly: true })
    createdAt?: Date;

    @ApiProperty({ example: '2025-05-30T11:45:12Z', readOnly: true })
    updatedAt?: Date;
}
