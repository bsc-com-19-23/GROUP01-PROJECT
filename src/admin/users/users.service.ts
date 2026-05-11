import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
import { Patient } from '../../entities/patients.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'passwordhash', 'role', 'name'],
    });
  }
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  // CREATE USER
  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // CREATE USER
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordhash: hashedPassword,
      role: dto.role,
    });

    const savedUser = await this.repo.save(user);

    // CREATE PATIENT PROFILE
    if (dto.role === UserRole.PATIENT) {
      const patient = this.patientRepo.create({
        user: savedUser,
      });

      await this.patientRepo.save(patient);
    }
    return savedUser;
  }

  // GET ALL USERS
  findAll() {
    return this.repo.find();
  }

  // GET ONE USER
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  // UPDATE USER
  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, {
      ...dto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      role: dto.role ? ({ id: dto.role } as any) : undefined,
    });
    return this.findOne(id);
  }

  // DELETE USER
  remove(id: number) {
    return this.repo.delete(id);
  }

  // ACTIVATE / DEACTIVATE
  async setActive(id: number, status: boolean) {
    await this.repo.update(id, { isActive: status });
    return this.findOne(id);
  }
}
