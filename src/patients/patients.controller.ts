
import { Controller, Post, Body } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('login')
  async login(@Body() body: { name: string; password: string }) {
    return await this.patientsService.login(body.name, body.password);
  }
}
