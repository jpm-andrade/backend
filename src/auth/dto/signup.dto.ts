//src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  name: string;
}
