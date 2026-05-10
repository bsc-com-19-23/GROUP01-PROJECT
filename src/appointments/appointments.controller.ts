import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // GET all appointments
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  // GET one appointment by ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appointmentsService.findOne(id);
  }

  // POST create a new appointment
  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto);
  }

  // PUT update an existing appointment
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, dto);
  }

  // DELETE an appointment by ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentsService.remove(id);
  }
}
