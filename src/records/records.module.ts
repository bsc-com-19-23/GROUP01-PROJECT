// medical-record.module.ts

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicalRecordController } from './records.controller';
import { MedicalRecordService } from './records.service';

import { MedicalRecord } from '../entities/records.entity';
import { Patient } from '../entities/patients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, Patient])],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
})
export class recordsModule {}
