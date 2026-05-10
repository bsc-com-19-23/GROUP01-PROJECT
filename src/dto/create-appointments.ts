import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  patientId!: number;

  @IsNumber()
  healthOfficerId!: number;

  @IsDateString()
  appointmentDate!: Date;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}
