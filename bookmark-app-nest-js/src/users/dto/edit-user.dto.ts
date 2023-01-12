import { IsEmail, IsOptional } from 'class-validator';

export class EditUserDTO {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}
