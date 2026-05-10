// staff.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Patient } from '../entities/patients.entity';
import { MedicalRecord } from '../entities/records.entity';
@Injectable()
export class StaffService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    @InjectRepository(MedicalRecord)
    private readonly recordRepository: Repository<MedicalRecord>,
  ) {}

  // =========================================
  // VERIFY PATIENT HEALTH INFORMATION
  // =========================================

  async verifyPatient(patientId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = await this.patientRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    patient.isVerified = true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.patientRepository.save(patient);
  }

  // =========================================
  // UPDATE HEALTH PASSPORT STATUS
  // =========================================

  async updatePassportStatus(patientId: number, passportStatus: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = await this.patientRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    patient.passportStatus = passportStatus;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.patientRepository.save(patient);
  }

  // =========================================
  // CREATE MEDICAL REPORT
  // =========================================

  async createMedicalReport(
    patientId: number,
    reportData: Partial<MedicalRecord>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = await this.patientRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const report = this.recordRepository.create({
      ...reportData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      patient,
      createdAt: new Date(),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.recordRepository.save(report);
  }

  // =========================================
  // GET PATIENT MEDICAL REPORTS
  // =========================================

  async getPatientReports(patientId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.recordRepository.find({
      where: {
        patient: {
          id: patientId,
        },
      },
      relations: ['patient'],
    });
  }
}
