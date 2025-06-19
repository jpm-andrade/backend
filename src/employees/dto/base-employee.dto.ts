import { ApiProperty } from '@nestjs/swagger';

export class BaseEmployee {
  /* ──────────────── PK ──────────────── */

  @ApiProperty({ example: 42, readOnly: true })
  id?: number;

  /* ─────────────── Scalar columns ─────────────── */

  @ApiProperty({ example: 'Alice' })
  firstName: string;

  @ApiProperty({ example: 'Johnson' })
  lastName: string;

  @ApiProperty({ example: '1990-04-23' })
  dateOfBirth: Date;

  @ApiProperty({ example: 'female', description: 'male | female | non-binary | …' })
  gender: string;

  @ApiProperty({ example: 'NL', description: 'ISO-3166-1 alpha-2 country code' })
  country: string;

  @ApiProperty({ example: 'True', description: 'true | false' })
  freelancer: boolean;

  @ApiProperty({ example: '75', description: 'Rate for of the employee' })
  fixedRate: number;


  /* ─────────────── Relations as IDs ─────────────── */

  @ApiProperty({
    type: [Number],
    example: [1, 3],
    description: 'IDs of the languages this employee speaks',
  })
  languageIds?: number[];

  @ApiProperty({ example: 7, description: 'Shop ID the employee belongs to' })
  shopId: number;
  
  @ApiProperty({ example: 7, description: 'Role Id the employee has' })
  roleId: number;

}
