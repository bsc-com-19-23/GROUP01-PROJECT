// staff.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

import { Patient } from '../entities/patients.entity';
import { MedicalRecord } from '../entities/records.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Patient, MedicalRecord])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
