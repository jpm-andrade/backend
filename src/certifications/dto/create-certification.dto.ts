import { IsString, IsNotEmpty, MaxLength, IsInt } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCertificationDto {
  @ApiProperty({
    description: 'Label of the certification (e.g. Open Water)',
    example: 'Open Water',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  label: string

  @ApiProperty({
    description: 'ID of the shop this certification belongs to',
    example: 42,
  })
  @IsInt()
  @Type(() => Number)
  shopId: number
}
