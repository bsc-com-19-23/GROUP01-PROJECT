import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff-module/staff-module.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',

        
        connectString: `${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_SERVICE')}`,

        
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),

        
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        autoLoadEntities: true,
      }),
    }),

    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}