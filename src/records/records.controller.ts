// records.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { MedicalRecordService } from './records.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '../entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical-records')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  // =========================================
  // CREATE MEDICAL RECORD
  // ONLY HEALTHY OFFICER
  // =========================================

  @Post('patients/:id')
  @Roles(UserRole.HEALTHY_OFFICER)
  createMedicalRecord(
    @Param('id') patientId: string,

    @Body()
    body: {
      diagnosis: string;
      treatment: string;
      recommendation: string;
      doctorNotes: string;
      hospitalName: string;
    },
  ) {
    return this.medicalRecordService.createMedicalRecord(
      Number(patientId),
      body,
    );
  }

  // =========================================
  // GET ALL MEDICAL RECORDS FOR PATIENT
  // PATIENT + HEALTHY OFFICER
  // =========================================

  @Get('patients/:id')
  @Roles(UserRole.PATIENT, UserRole.HEALTHY_OFFICER)
  getPatientMedicalRecords(@Param('id') patientId: string) {
    return this.medicalRecordService.getPatientMedicalRecords(
      Number(patientId),
    );
  }

  // =========================================
  // UPDATE MEDICAL RECORD STATUS
  // ONLY HEALTHY OFFICER
  // =========================================

  @Patch(':id/status')
  @Roles(UserRole.HEALTHY_OFFICER)
  updateMedicalRecordStatus(
    @Param('id') recordId: string,

    @Body()
    body: {
      reportStatus: string;
    },
  ) {
    return this.medicalRecordService.updateMedicalRecordStatus(
      Number(recordId),
      body.reportStatus,
    );
  }
}
