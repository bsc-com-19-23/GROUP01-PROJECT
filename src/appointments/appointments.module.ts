// appointments.module.ts

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

import { Appointment } from './Entities/appointment.entity';

import { Patient } from '../entities/patients.entity';

import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, User])],

  controllers: [AppointmentsController],

  providers: [AppointmentsService],
})
export class AppointmentsModule {}
