<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './admin/users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'pdb_admin',
      password: 'Group1',
      serviceName: 'HEALTHY_PASSPORT_PDB', // or serviceName
      synchronize: true, // ⚠️ only for development
      logging: true,
      entities: [User],
    }),
    UsersModule,
    AuthModule,
=======

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthenticationModule } from './authentication/authentication.module';

// Explicit imports of your entities
import { Appointment } from './appointments/Entities/appointment.entity';
import { Patient } from './patients/patients.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      serviceName: process.env.DB_SERVICE,
      synchronize: false,
      logging: true,
      // Explicitly list entities so TypeORM knows about them
      entities: [Appointment, Patient],
    }),

    PatientsModule,
    AppointmentsModule,
    AuthenticationModule,
>>>>>>> 7183271e08a504e801bebdfe8f429b4eb17185b9
  ],
})
export class AppModule {}
