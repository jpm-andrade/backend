import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { BaseOrganization } from './base-organization.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrganizationDto extends BaseOrganization {
    
    @ApiProperty()
    isActive:boolean;
}
