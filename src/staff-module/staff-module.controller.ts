import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StaffService } from './staff-module.service';
import { CreateRecordDto } from './dto/create-record.dto'; 

@Controller('api/v1/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get('patients') 
  findAll() { 
    return this.staffService.findAll();
  }

  @Get('patients/:id')
  getHistory(@Param('id') id: string) {
    return this.staffService.getStudentHistory(+id);
  }

  @Post('records/:id')
  createRecord(
    @Param('id') id: string, 
    @Body() createRecordDto: CreateRecordDto 
  ) {
    return this.staffService.addRecord(+id, createRecordDto);
  }
}