// src/authorized-shops/dto/update-authorized-shop.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsNumber,
    IsOptional,
  } from "class-validator";
  import { ApiPropertyOptional } from "@nestjs/swagger";
  
  export class UpdateAuthorizedShopDto { 
    @ApiPropertyOptional({ description: "(Optional) Toggle active state" })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @ApiPropertyOptional({ description: "(Optional) New Shop entity ID" })
    @IsNumber()
    @IsOptional()
    shopId?: number;
  
    @ApiPropertyOptional({ description: "(Optional) New Organization ID (or null)" })
    @IsNumber()
    @IsOptional()
    organizationId?: number;
  
    @ApiPropertyOptional({ description: "(Optional) New User ID" })
    @IsNumber()
    @IsOptional()
    userId?: number;
  }
  