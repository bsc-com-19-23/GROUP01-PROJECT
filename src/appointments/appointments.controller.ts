// appointments.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AppointmentsService } from './appointments.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guards';

import { Roles } from '../auth/decorators/roles.decorators';

import { UserRole } from '../entities/user.entity';

import { CreateAppointmentDto } from '../dto/create-appointments';

import { UpdateAppointmentStatusDto } from '../dto/update-appointment-status.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // =========================================
  // CREATE APPOINTMENT
  // PATIENT ONLY
  // =========================================

  @Post()
  @Roles(UserRole.PATIENT)
  async createAppointment(
    @Body()
    dto: CreateAppointmentDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.appointmentsService.createAppointment(
      dto.patientId,
      dto.healthOfficerId,
      dto.appointmentDate,
      dto.reason,
    );
  }

  // =========================================
  // GET ALL APPOINTMENTS
  // HEALTHY OFFICER ONLY
  // =========================================

  @Get()
  @Roles(UserRole.HEALTHY_OFFICER)
  async getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }

  // =========================================
  // GET PATIENT APPOINTMENTS
  // PATIENT ONLY
  // =========================================

  @Get('patient/:id')
  @Roles(UserRole.PATIENT)
  async getPatientAppointments(@Param('id') patientId: string) {
    return this.appointmentsService.getPatientAppointments(Number(patientId));
  }

  // =========================================
  // UPDATE APPOINTMENT STATUS
  // HEALTHY OFFICER ONLY
  // =========================================

  @Patch(':id/status')
  @Roles(UserRole.HEALTHY_OFFICER)
  async updateAppointmentStatus(
    @Param('id') appointmentId: string,

    @Body()
    dto: UpdateAppointmentStatusDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.appointmentsService.updateAppointmentStatus(
      Number(appointmentId),
      dto.status,
    );
  }

  // =========================================
  // CANCEL APPOINTMENT
  // PATIENT ONLY
  // =========================================

  @Patch(':id/cancel')
  @Roles(UserRole.PATIENT)
  async cancelAppointment(@Param('id') appointmentId: string) {
    return this.appointmentsService.cancelAppointment(Number(appointmentId));
  }
}
