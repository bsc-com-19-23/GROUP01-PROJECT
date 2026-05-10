// medical-record.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { MedicalRecord } from '../entities/records.entity';

import { Patient } from '../entities/patients.entity';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  // =========================================
  // CREATE MEDICAL RECORD
  // =========================================

  async createMedicalRecord(
    patientId: number,
    recordData: Partial<MedicalRecord>,
  ) {
    const patient = await this.patientRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const medicalRecord = this.medicalRecordRepository.create({
      ...recordData,
      patient,
      reportStatus: 'ACTIVE',
      createdAt: new Date(),
    });

    return await this.medicalRecordRepository.save(medicalRecord);
  }

  // =========================================
  // GET PATIENT MEDICAL RECORDS
  // =========================================

  async getPatientMedicalRecords(patientId: number) {
    const patient = await this.patientRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return await this.medicalRecordRepository.find({
      where: {
        patient: {
          id: patientId,
        },
      },
      relations: ['patient'],
    });
  }

  // =========================================
  // UPDATE MEDICAL RECORD STATUS
  // =========================================

  async updateMedicalRecordStatus(recordId: number, reportStatus: string) {
    const medicalRecord = await this.medicalRecordRepository.findOne({
      where: {
        id: recordId,
      },
    });

    if (!medicalRecord) {
      throw new NotFoundException('Medical record not found');
    }

    medicalRecord.reportStatus = reportStatus;

    return await this.medicalRecordRepository.save(medicalRecord);
  }
}
