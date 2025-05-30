import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeLanguageDto {
    @ApiProperty({ example: 104, description: 'Employee ID' })
    employeeId: number;

    @ApiProperty({ example: 3, description: 'Language ID' })
    languageId: number;
}
