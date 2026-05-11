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

import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepo: Repository<MedicalRecord>,

    private readonly jwtService: JwtService,
  ) {}

  // =========================================
  // PATIENT LOGIN
  // =========================================

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
        role: UserRole.PATIENT,
      },

      select: ['id', 'name', 'email', 'passwordhash', 'role'],
    });

    if (!user) {
      throw new NotFoundException('Patient not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordhash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const patient = await this.patientRepo.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['user'],
    });

    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      success: true,
      message: 'Login successful',
      access_token,
      patient,
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
