// appointments.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Patient } from '../../entities/patients.entity';

import { User } from '../../entities/user.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  appointmentDate!: Date;

  @Column()
  reason!: string;

  @Column({
    default: 'PENDING',
  })
  status!: string;

  @Column()
  createdAt!: Date;

  // =========================================
  // PATIENT RELATION
  // =========================================

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient!: Patient;

  // =========================================

  @ManyToOne(() => User)
  healthOfficer!: User;
}
