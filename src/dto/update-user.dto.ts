import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  name?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  isActive?: boolean;
}
