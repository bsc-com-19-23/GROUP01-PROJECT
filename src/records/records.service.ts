import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RecordsController } from './records.controller';
import { RecordEntity } from './entities/entities/record.entity';


@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(RecordsController)
        private repo: Repository<RecordEntity>,
    ) { }

    // CREATE a new medical record
    async create(data: any) {
        const record = this.repo.create(data);
        return await this.repo.save(record);
    }

    // GET one record by ID
    async findOneBy(id: number) {
        const record = await this.repo.findOneBy({ where: { id } } as FindOptionsWhere<RecordEntity>);
        if (!record) {
            throw new NotFoundException('Record not found');
        }
        return record;
    }

    // SEARCH records (by date or condition)
    async search(condition?: string, date?: string) {
        const query = this.repo.createQueryBuilder('record');
        if (condition) {
            query.andWhere('record.condition LIKE :condition', {
                condition: `%${condition}%`,
            });
        }

        if (date) {
            query.andWhere('record.date = :date', { date });
        }
        return await query.getMany();
    }
}
