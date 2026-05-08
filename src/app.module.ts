import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './admin/users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'pdb_admin',
      password: 'Group1',
      serviceName: 'HEALTHY_PASSPORT_PDB', // or serviceName
      synchronize: true, // ⚠️ only for development
      logging: true,
      entities: [User],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
