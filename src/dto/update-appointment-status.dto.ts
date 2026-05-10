// dto/update-appointment-status.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAppointmentStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string;
}
