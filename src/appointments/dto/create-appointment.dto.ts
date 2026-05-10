// create-appointment.dto.ts
import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  patient_id: number;

  @IsNumber()
  staff_id: number;

  @IsDateString()
  date_time: Date;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
