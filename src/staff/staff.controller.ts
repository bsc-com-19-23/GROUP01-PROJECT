// staff.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { StaffService } from './staff.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';

import { UserRole } from '../entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.HEALTHY_OFFICER)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // =========================================
  // VERIFY PATIENT HEALTH INFORMATION
  // =========================================

  @Patch('patients/:id/verify')
  async verifyPatient(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.staffService.verifyPatient(Number(id));
  }

  // =========================================
  // UPDATE HEALTH PASSPORT STATUS
  // =========================================

  @Patch('patients/:id/passport-status')
  async updatePassportStatus(
    @Param('id') id: string,
    @Body()
    body: {
      passportStatus: string;
    },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.staffService.updatePassportStatus(
      Number(id),
      body.passportStatus,
    );
  }

  // =========================================
  // CREATE MEDICAL REPORT
  // =========================================

  @Post('patients/:id/reports')
  async createMedicalReport(
    @Param('id') id: string,
    @Body()
    body: {
      diagnosis: string;
      recommendation: string;
    },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.staffService.createMedicalReport(Number(id), body);
  }

  // =========================================
  // GET PATIENT MEDICAL REPORTS
  // =========================================

  @Get('patients/:id/reports')
  async getPatientReports(@Param('id') id: string) {
    return this.staffService.getPatientReports(Number(id));
  }
}
