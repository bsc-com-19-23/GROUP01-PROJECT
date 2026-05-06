import { IsNumber } from 'class-validator';

export class QueryStudentDto {
  @IsNumber()
  id: number;
}
