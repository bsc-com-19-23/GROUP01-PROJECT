import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffController } from './staff-module.controller';
import { StaffService } from './staff-module.service';
import { MedicalRecord } from './entities/Medical-Record';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, User])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
