
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patients.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async login(name: string, password: string) {
    const patient = await this.patientRepo.findOne({ where: { name } });

    if (!patient) {
      // Instead of returning { success: false }, throw a proper exception
      throw new NotFoundException('Patient not found');
    }

    if (patient.passwordHash !== password) {
      // Wrong password → 401 Unauthorized
      throw new UnauthorizedException('Invalid credentials');
    }

    // If everything is fine, return a success response
    return { success: true, message: 'Login successful', patient };
  }
}

