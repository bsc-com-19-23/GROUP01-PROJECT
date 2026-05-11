import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MedicalRecord } from './records.entity';

import { Appointment } from '../appointments/Entities/appointment.entity';

import { User } from './user.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
