    
import {IsString,IsNotEmpty,IsOptional,IsNumber, IsDateString} from 'class-validator';

export class UpdateRecordDto{
    @IsNumber()
    id!: number;
     
    @IsString()
    @IsNotEmpty()
    patientId!: string;
      
    @IsString()
    @IsNotEmpty()
    medication!: string;
     
    @IsOptional()
    @IsString()
    diagnosis!: string;
    
    @IsOptional()
    @IsString()
    notes!: string;
     
    @IsOptional()
    @IsString()
    @IsDateString()
    visitDate!: string;
    
    @IsOptional()
    @IsString()
    diagnosisedBy!: string;
}

