// src/authorized-shops/dto/create-authorized-shop.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsNumber,
    IsOptional,
  } from "class-validator";
  import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
  
  export class CreateAuthorizedShopDto {
 
    @ApiPropertyOptional({ description: "Whether the shop is active", default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @ApiProperty({ description: "ID of the existing Shop entity to link" })
    @IsNumber()
    @IsNotEmpty()
    shopId: number;
  
    @ApiPropertyOptional({ description: "ID of the Organization to link (optional)" })
    @IsNumber()
    @IsOptional()
    organizationId?: number;
  
    @ApiProperty({ description: "ID of the User who owns this AuthorizedShop" })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
  }
  