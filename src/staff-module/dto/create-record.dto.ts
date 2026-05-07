import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Condition name is too short' })
  condition!: string;

  @IsString()
  @IsNotEmpty()
  medication!: string;
}