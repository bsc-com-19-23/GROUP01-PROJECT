import { Controller, Post, Get, Param, Query, Body, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { UpdateRecordDto } from './dto/create-record.dto.ts/create-record.dto.ts';

@Controller('api/v1/records')
export class RecordsController {
    constructor(private recordsService: RecordsService) { }

    @Post()
    create(@Body() body) {
        return this.recordsService.create(body);
    }

    // GET /records/:id
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.recordsService.findOneBy(id);
    }

    // GET /records/search?date=...
    @Get('search')
    search(@Query('date') query: UpdateRecordDto, date: string) {
        return this.recordsService.search(undefined, date);
    }
}
