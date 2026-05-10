import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MedicalRecord } from './records.entity';

import { Appointment } from '../appointments/Entities/appointment.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  // =========================================
  // HEALTH PASSPORT INFORMATION
  // =========================================

  @Column({ default: false })
  isVerified!: boolean;

  @Column({
    default: 'PENDING',
  })
  passportStatus!: string;

  @OneToMany(() => MedicalRecord, (record) => record.patient)
  medicalRecords!: MedicalRecord[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Appointment[];
}
