// medical-record.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Patient } from './patients.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  // =========================================
  // MEDICAL INFORMATION
  // =========================================

  @Column()
  diagnosis!: string;

  @Column()
  treatment!: string;

  @Column()
  recommendation!: string;

  @Column()
  doctorNotes!: string;

  @Column()
  hospitalName!: string;

  // =========================================
  // RECORD STATUS
  // =========================================

  @Column({
    default: 'ACTIVE',
  })
  reportStatus!: string;

  // =========================================
  // TIMESTAMP
  // =========================================

  @Column()
  createdAt!: Date;

  // =========================================
  // RELATIONSHIP WITH PATIENT
  // =========================================

  @ManyToOne(() => Patient, (patient) => patient.medicalRecords)
  patient!: Patient;
}
