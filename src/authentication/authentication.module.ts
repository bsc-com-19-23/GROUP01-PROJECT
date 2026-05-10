// src/authentication/authentication.module.ts
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService], // so PatientsModule can use it if needed
})
export class AuthenticationModule {}
