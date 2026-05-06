
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
  ],
})
export class AppModule {}
