import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './Entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
@Injectable()

export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}
   async findAll():Promise<Appointment[]>{return await this.appointmentRepo.find();
    
   }
  async findOne(id: number): Promise<Appointment |null> {
    return await this.appointmentRepo.findOneBy({ id});
  }

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepo.create(dto);
    return await this.appointmentRepo.save(appointment);
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<Appointment|null> {
    await this.appointmentRepo.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepo.delete(id);
  }
}
