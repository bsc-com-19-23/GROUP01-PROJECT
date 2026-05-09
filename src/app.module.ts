import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './records/records.module';
import { RecordEntity } from './records/entities/entities/record.entity';


@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRootAsync({
imports: [ConfigModule],
inject: [ConfigService],
useFactory: (config: ConfigService) => ({

type: 'oracle',
host: config.get('DB_HOST'),
port: config.get('DB_PORT'),
username: config.get('DB_USERNAME'),
password: config.get('DB_PASSWORD'),
serviceName: config.get('DB_SERVICE_NAME'),
synchronize: config.get('DB_SYNCHRONIZE') === 'true',
entities: [RecordEntity],
logging: true,
}),
}),

RecordsModule,

],
})
export class AppModule {}