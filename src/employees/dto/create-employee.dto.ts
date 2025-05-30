import { ApiProperty } from "@nestjs/swagger";
import { BaseEmployee } from "./base-employee.dto";

export class CreateEmployeeDto extends BaseEmployee {
    /* ─────────────── Audit columns ─────────────── */

    @ApiProperty({ example: 5, readOnly: true, description: 'User ID who created the record' })
    createdById?: number;

    @ApiProperty({ example: 8, readOnly: true, description: 'User ID who last updated the record' })
    updatedById?: number;
}
