import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
