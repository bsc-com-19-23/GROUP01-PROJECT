import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { PatientsService } from './patients.service';
import { PatientLoginDto } from './dto/patients-login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '..//auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '../entities/user.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // =========================================
  // PATIENT LOGIN
  // =========================================

  @Post('login')
  async login(@Body() dto: PatientLoginDto) {
    return this.patientsService.login(dto.email, dto.password);
  }

  // =========================================
  // VIEW OWN MEDICAL RECORDS
  // =========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PATIENT)
  @Get('records')
  getOwnRecords(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.patientsService.getMedicalRecords(req.user.sub);
  }
}
