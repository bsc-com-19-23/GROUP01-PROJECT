import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './admin/users/users.module';
import { AuthModule } from './auth/auth.module';
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
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 1521,
      username: process.env.DB_USER || 'pdb_admin',
      password: process.env.DB_PASS || 'Group1',
      serviceName: process.env.DB_SERVICE || 'HEALTHY_PASSPORT_PDB',
      synchronize: true, // ⚠️ only for development
      logging: true,
      entities: [User, Appointment, Patient],
    }),
    UsersModule,
    AuthModule,
    PatientsModule,
    AppointmentsModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
