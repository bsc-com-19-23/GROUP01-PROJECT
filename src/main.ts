// main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { getRepositoryToken } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { User, UserRole } from './entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const usersRepository = app.get(getRepositoryToken(User));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const existingAdmin = await usersRepository.findOne({
    where: {
      email: 'admin@gmail.com',
    },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123456', 10);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const admin = usersRepository.create({
      name: 'System Admin',
      email: 'admin@gmail.com',
      passwordhash: hashedPassword,
      role: UserRole.ADMIN,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await usersRepository.save(admin);

    console.log('Default admin created successfully');
  }

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);

  console.log(`
=========================================
 DIGITAL HEALTH PASSPORT API RUNNING
  `);
}

void bootstrap();
