// patients/dto/patient-login.dto.ts

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PatientLoginDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
