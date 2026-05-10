// appointments.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Appointment } from './Entities/appointment.entity';

import { Patient } from '../entities/patients.entity';

import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // =========================================
  // CREATE APPOINTMENT
  // =========================================

  async createAppointment(
    patientId: number,
    healthOfficerId: number,
    appointmentDate: Date,
    reason: string,
  ) {
    const patient = await this.patientRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const healthOfficer = await this.userRepository.findOne({
      where: {
        id: healthOfficerId,
        role: UserRole.HEALTHY_OFFICER,
      },
    });

    if (!healthOfficer) {
      throw new NotFoundException('Health officer not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const appointment = this.appointmentRepository.create({
      appointmentDate,
      reason,
      status: 'PENDING',
      createdAt: new Date(),
      patient,
      healthOfficer,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.appointmentRepository.save(appointment);
  }

  // =========================================
  // GET ALL APPOINTMENTS
  // =========================================

  async getAllAppointments() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.appointmentRepository.find({
      relations: ['patient', 'healthOfficer'],
    });
  }

  // =========================================
  // GET PATIENT APPOINTMENTS
  // =========================================

  async getPatientAppointments(patientId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.appointmentRepository.find({
      where: {
        patient: {
          id: patientId,
        },
      },
      relations: ['patient', 'healthOfficer'],
    });
  }

  // =========================================
  // UPDATE APPOINTMENT STATUS
  // =========================================

  async updateAppointmentStatus(appointmentId: number, status: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const appointment = await this.appointmentRepository.findOne({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.status = status;

    return await this.appointmentRepository.save(appointment);
  }

  // =========================================
  // CANCEL APPOINTMENT
  // =========================================

  async cancelAppointment(appointmentId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const appointment = await this.appointmentRepository.findOne({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.status = 'CANCELLED';

    return await this.appointmentRepository.save(appointment);
  }
}
