import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from './entities/Medical-Record';
import { User } from './entities/user.entity';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(MedicalRecord)
    private recordRepository: Repository<MedicalRecord>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getStudentHistory(patientId: number) {
    return this.recordRepository.find({
      where:{ patient: { id: patientId } },
      
    });
  }
  async findAll(): Promise<User[]> { 
    return await this.userRepository.find(); 
  } 

  async addRecord(patientId: number, dto: CreateRecordDto) {
    
    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found`);
    }

    
    const newRecord = this.recordRepository.create({
      ...dto,
      patient,
    });

    // Step 3: Save the record
    return this.recordRepository.save(newRecord);
  }
}
