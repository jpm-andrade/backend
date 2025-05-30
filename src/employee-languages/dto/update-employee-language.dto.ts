import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEmployeeLanguageDto } from './create-employee-language.dto';

export class UpdateEmployeeLanguageDto extends PartialType(CreateEmployeeLanguageDto) {
    @ApiPropertyOptional({ example: 12, readOnly: true })
    id?: number;
}
