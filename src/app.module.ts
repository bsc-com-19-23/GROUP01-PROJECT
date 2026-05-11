import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './admin/users/users.module';

import { PatientsModule } from './patients/patients.module';

import { StaffModule } from './staff/staff.module';

import { AppointmentsModule } from './appointments/appointments.module';

import { recordsModule } from './records/records.module';

import { User } from './entities/user.entity';

import { Patient } from './entities/patients.entity';

import { Appointment } from './appointments/Entities/appointment.entity';

import { MedicalRecord } from './entities/records.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'oracle',

      host: process.env.DB_HOST || 'localhost',

      port: Number(process.env.DB_PORT) || 1521,

      username: process.env.DB_USER || 'pdb_admin',

      password: process.env.DB_PASS || 'Group1',

      serviceName: process.env.DB_SERVICE || 'HEALTHY_PASSPORT_PDB',

      synchronize: true,

      logging: true,

      entities: [User, Patient, Appointment, MedicalRecord],
    }),

    AuthModule,

    UsersModule,

    PatientsModule,

    StaffModule,

    AppointmentsModule,

    recordsModule,
  ],
})
export class AppModule {}
