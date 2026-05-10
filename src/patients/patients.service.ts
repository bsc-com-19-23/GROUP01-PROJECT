// patients.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { Patient } from '../entities/patients.entity';

import { MedicalRecord } from '../entities/records.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,

    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepo: Repository<MedicalRecord>,

    private readonly jwtService: JwtService,
  ) {}

  // =========================================
  // PATIENT LOGIN
  // =========================================

  async login(email: string, password: string) {
    const patient = await this.patientRepo.findOne({
      where: { email },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      patient.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // =========================================
    // GENERATE JWT TOKEN
    // =========================================

    const payload = {
      sub: patient.id,
      name: patient.name,
      role: 'PATIENT',
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      success: true,
      message: 'Login successful',
      access_token,
      patient: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        passportStatus: patient.passportStatus,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isVerified: patient.isVerified,
      },
    };
  }

  // =========================================
  // VIEW PATIENT MEDICAL RECORDS
  // =========================================

  async getMedicalRecords(patientId: number) {
    const patient = await this.patientRepo.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const medicalReports = await this.medicalRecordRepo.find({
      where: {
        patient: {
          id: patientId,
        },
      },
      relations: ['patient'],
    });

    return {
      patient,
      medicalReports,
    };
  }
}
