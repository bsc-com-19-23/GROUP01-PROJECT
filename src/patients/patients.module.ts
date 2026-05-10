// patients.module.ts

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

import { Patient } from '../entities/patients.entity';

import { MedicalRecord } from '../entities/records.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, MedicalRecord]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [PatientsController],

  providers: [PatientsService],

  exports: [PatientsService],
})
export class PatientsModule {}
